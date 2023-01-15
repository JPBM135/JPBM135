// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['cdn.discordapp.com'],
	},
};

module.exports = nextConfig;
