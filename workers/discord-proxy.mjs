/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const CORS = ['http://localhost:4200', 'https://jpbm.dev'];

const CACHE_AGE_SECONDS = 10;

const DISCORD_USER_ID = 'YOUR_USER_ID_HERE';

export default {
  /**
   * @param {Request} req
   * @param {*} _
   * @param {ExecutionContext} ctx
   */
  async fetch(req, _, ctx) {
    const cacheUrl = new URL(req.url);
    const cacheKey = new Request(cacheUrl.toString(), req);

    const origin = req.headers.get('Origin');
    const allowedOrigin = CORS.includes(origin) ? origin : 'undefined';

    const headers = {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    };

    if (req.method === 'OPTIONS') {
      console.log('Preflight received, responding with headers!');
      return new Response(null, {
        headers,
      });
    }

    const instanceCache = caches.default;
    const cloudflareCacheResponse = await instanceCache.match(cacheKey);

    if (cloudflareCacheResponse) {
      console.log('Cache hit, responding with cached data!');
      return cloudflareCacheResponse;
    }

    const nowIso = new Date().toISOString();

    console.log('Cache miss, fetching from origin!');
    try {
      const discordResponse = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`, {
        headers: {
          'X-Source': 'JPBM135-Cloudflare-Workers',
        },
      });

      const discordResponseData = await discordResponse.json();

      Reflect.set(discordResponseData, 'timestamp', nowIso);
      Reflect.deleteProperty(discordResponseData?.data?.discord_user ?? {}, 'id');

      const response = new Response(JSON.stringify(discordResponseData), {
        headers: {
          ...headers,
          'content-type': 'application/json',
          'Cache-Control': `s-maxage=${CACHE_AGE_SECONDS}`,
        },
        status: 200,
      });

      ctx.waitUntil(instanceCache.put(cacheKey, response.clone()));

      return response;
    } catch (error) {
      console.log('Error received from upstream!', error);
      return new Response(JSON.stringify({ success: false, timestamp: nowIso, data: {} }), {
        headers: {
          ...headers,
          'content-type': 'application/json',
        },
        status: 200,
      });
    }
  },
};
