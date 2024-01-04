import { Inter } from '@next/font/google';
import Head from 'next/head';
import { META_DESCRIPTION, META_IMAGE, META_TITLE, SITE_URL } from '@/constants';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<Head>
			<title>{META_TITLE}</title>
			<meta content={META_DESCRIPTION} name="description" />
			<meta content="width=device-width, initial-scale=1" name="viewport" />
			<link href="/favicon.ico" rel="icon" />
			<meta content="index, follow" name="robots" />
			<link href={SITE_URL} rel="canonical" />
			<meta content="pt-BR" name="language" />
			<meta content="en-US" name="language" />

			<meta content={META_TITLE} name="title" />
			<meta content={META_DESCRIPTION} name="description" />
			<meta content='fullstack developer, fullstack, developer, jpbm135, node.js, angular, graphql, postgres' name='keywords' />

			<meta content="website" property="og:type" />
			<meta content={SITE_URL} property="og:url" />
			<meta content={META_TITLE} property="og:title" />
			<meta content={META_DESCRIPTION} property="og:description" />
			<meta content={META_IMAGE} property="og:image" />

			<meta content="summary_large_image" property="twitter:card" />
			<meta content={SITE_URL} property="twitter:url" />
			<meta content={META_TITLE} property="twitter:title" />
			<meta content={META_DESCRIPTION} property="twitter:description" />
			<meta content={META_IMAGE} property="twitter:image" />

		</Head>
	);
}
