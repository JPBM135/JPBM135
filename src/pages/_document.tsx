import { Html, Head, Main, NextScript } from 'next/document';
import MainText from '@/components/MainText';

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body className="bg-gradient-to-b from-gray-900 to-black">
				<Main />
				<NextScript />
				<MainText />
			</body>
		</Html>
	);
}
