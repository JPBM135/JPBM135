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
const SPARK_POST_KEY = 'YOUR_SPARKPOST_API_KEY_HERE';
const TURNSTILE_SECRET = 'YOUR_TURNSILE_SECRET';
const MASTER_EMAIL = 'YOUR_EMAIL_HERE';

/**
 * Template for replying to the contact form submitter
 */
const TEMPLATE_ACK_ID = 'contact-ack';
/**
 * Template for forwarding the contact form to the owner
 * of the website
 */
const TEMPLATE_FORWARD_ID = 'contact-forward';

/**
 * @param {Request} req
 * @param {ExecutionContext} ctx
 */
async function handleDiscordRequest(req, ctx, defaultHeaders = {}) {
  const cacheUrl = new URL(req.url);
  const cacheKey = new Request(cacheUrl.toString(), req);

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
        ...defaultHeaders,
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
        ...defaultHeaders,
        'content-type': 'application/json',
      },
      status: 200,
    });
  }
}

/**
 * @param {Request} req
 */
async function handleContactFormSubmit(req, defaultHeaders = {}) {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Method Not Allowed',
      }),
      {
        status: 405,
        headers: {
          ...defaultHeaders,
          'content-type': 'application/json',
        },
      },
    );
  }

  const data = await req.json();
  const { name, email, message, cfToken } = data;
  if ([name, email, message, cfToken].some((field) => !field)) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Missing required fields',
      }),
      {
        status: 400,
        headers: {
          ...defaultHeaders,
          'content-type': 'application/json',
        },
      },
    );
  }

  const ip = req.headers.get('CF-Connecting-IP');

  // Validate the token by calling the
  // "/siteverify" API endpoint.
  let formData = new FormData();
  formData.append('secret', TURNSTILE_SECRET);
  formData.append('response', cfToken);
  if (ip) {
    formData.append('remoteip', ip);
  }

  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  const captchaResponse = await fetch(url, {
    body: formData,
    method: 'POST',
  });

  const captchaResponseData = await captchaResponse.json();

  if (!captchaResponseData.success) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to validate captcha',
      }),
      {
        status: 400,
        headers: {
          ...defaultHeaders,
          'content-type': 'application/json',
        },
      },
    );
  }

  const sparkPostResponse = await fetch('https://api.sparkpost.com/api/v1/transmissions', {
    method: 'POST',
    headers: {
      Authorization: SPARK_POST_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: {
        template_id: TEMPLATE_ACK_ID,
      },
      recipients: [{ address: email, substitution_data: { name } }],
    }),
  });

  if (!sparkPostResponse.ok) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to send acknowledgement email',
      }),
      {
        status: 500,
        headers: {
          ...defaultHeaders,
          'content-type': 'application/json',
        },
      },
    );
  }

  const sparkPostForwardResponse = await fetch('https://api.sparkpost.com/api/v1/transmissions', {
    method: 'POST',
    headers: {
      Authorization: SPARK_POST_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: {
        template_id: TEMPLATE_FORWARD_ID,
      },
      recipients: [
        {
          address: MASTER_EMAIL,
          substitution_data: { name, email, message, timestamp: new Date().toISOString() },
        },
      ],
    }),
  });

  if (!sparkPostForwardResponse.ok) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to send forward email',
      }),
      {
        status: 500,
        headers: {
          ...defaultHeaders,
          'content-type': 'application/json',
        },
      },
    );
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: 'Contact form submitted successfully',
    }),
    {
      status: 200,
      headers: {
        ...defaultHeaders,
        'content-type': 'application/json',
      },
    },
  );
}

export default {
  /**
   * @param {Request} req
   * @param {*} _
   * @param {ExecutionContext} ctx
   */
  async fetch(req, _, ctx) {
    const url = new URL(req.url);

    const origin = req.headers.get('Origin') ?? 'undefined';
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

    try {
      switch (url.pathname) {
        case '':
        case '/':
          const responseBody = JSON.stringify({
            success: true,
            message: 'I wonder what you are looking for here...Nice to meet you anyway!',
          });

          return new Response(JSON.stringify(responseBody), {
            status: 200,
          });
        case '/discord-proxy':
          return await handleDiscordRequest(req, ctx, headers);
        case '/contact-submit':
          return await handleContactFormSubmit(req, headers);

        default:
          return new Response('Not Found', {
            status: 404,
          });
      }
    } catch (error) {
      console.error('Error occurred while processing request', error);
      return new Response('Internal Server Error', {
        status: 500,
      });
    }
  },
};
