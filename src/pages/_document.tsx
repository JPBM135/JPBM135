import { Html, Head, Main, NextScript } from 'next/document';
import MainText from '@/components/MainText';

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body>
				<Main />
				<NextScript />
				<MainText />
			</body>
		</Html>
	);
}
