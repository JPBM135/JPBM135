import Image from 'next/image';
import { SOCIAL_ICON_SIZE } from '@/constants';
import styles from '@/styles/MainText.module.css';

export default function MainText() {
	return (
		<div className="relative flex min-h-screen flex-col justify-center">
			<Image
				alt="Profile Pic"
				className="rounded-lg block mx-auto "
				height={200}
				src="https://cdn.discordapp.com/avatars/485912377574031370/e5fd6b9374aa0faf32a7b9150759e815.png?size=1024"
				width={200}
			/>
			<div className="relative text-center">
				<div className="pt-7 text-5xl font-bold">
					<span className="text-zinc-200 hover:text-teal-50">J</span>
					<span className="text-zinc-200 hover:text-teal-100">P</span>
					<span className="text-zinc-200 hover:text-teal-200">B</span>
					<span className="text-zinc-200 hover:text-teal-400">M</span>
					<span className="text-zinc-200 hover:text-teal-500">1</span>
					<span className="text-zinc-200 hover:text-teal-600">3</span>
					<span className="text-zinc-200 hover:text-teal-700">5</span>
				</div>
				<div className="pt-2 text-3xl font-bold">
					<span className={styles['red-background']}>TEST</span>
					<span className="text-zinc-200 hover:text-teal-800">D</span>
					<span className="text-zinc-200 hover:text-teal-800">e</span>
					<span className="text-zinc-200 hover:text-teal-700">v</span>
					<span className="text-zinc-200 hover:text-teal-600">e</span>
					<span className="text-zinc-200 hover:text-teal-500">l</span>
					<span className="text-zinc-200 hover:text-teal-400">o</span>
					<span className="text-zinc-200 hover:text-teal-200">p</span>
					<span className="text-zinc-200 hover:text-teal-100">e</span>
					<span className="text-zinc-200 hover:text-teal-50">r</span>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center pt-7" id="social-icons">
				<div className="flex flex-row justify-center items-center space-x-6" id="social-icons">
					<a href="https://gibhub.com/JPBM135">
						<Image
							alt="Github Icon"
							className="rounded-lg block mx-auto shadow-current"
							height={SOCIAL_ICON_SIZE}
							src="/github.svg"
							width={SOCIAL_ICON_SIZE}
						/>
					</a>
					<a href="https://twitter.com/JPBM135">
						<Image
							alt="Twitter Icon"
							className="rounded-lg block mx-auto shadow-current"
							height={SOCIAL_ICON_SIZE}
							src="/twitter.svg"
							width={SOCIAL_ICON_SIZE}
						/>
					</a>
					<a href="mailto:jpedrobm0@gmail.com">
						<Image
							alt="Email Icon"
							className="rounded-lg block mx-auto shadow-current"
							height={SOCIAL_ICON_SIZE}
							src="/email.svg"
							width={SOCIAL_ICON_SIZE}
						/>
					</a>
				</div>
			</div>
		</div>
	);
}
