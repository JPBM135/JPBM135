import { Inter } from '@next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<Head>
			<title>JPBM Dev</title>
			<meta content="Developer JPBM135 creations and info" name="description" />
			<meta content="width=device-width, initial-scale=1" name="viewport" />
			<link href="/favicon.ico" rel="icon" />
		</Head>
	);
}
