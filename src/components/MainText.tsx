import Image from 'next/image';
import { GithubLogo, Envelope, LinkedinLogo } from 'phosphor-react';
import { SOCIAL_ICON_SIZE } from '@/constants';

function changeColorToTeal(evt: React.MouseEvent) {
	// @ts-expect-error: Fuck you
	evt.currentTarget.style.color = '#06B6D4';
}

export default function MainText() {
	const HIGHLIGHTED_SOCIAL_ICON_SIZE = Number(SOCIAL_ICON_SIZE) * 1.3

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
			<div className="flex flex-col justify-center items-center pt-5" id="social-icons">
				<div className="flex flex-row justify-center items-center space-x-6" id="social-icons">
					<a href="https://github.com/JPBM135" rel="noreferrer" target="_blank">
						<GithubLogo className="svg-social-icons" size={SOCIAL_ICON_SIZE} width="bold" />
					</a>
					<a className="" href="https://www.linkedin.com/in/jpbm135/" rel="noreferrer" target="_blank">
						<LinkedinLogo className="svg-social-icons" size={HIGHLIGHTED_SOCIAL_ICON_SIZE} width="bold" />
					</a>
					<a href="mailto:jpedrobm0@gmail.com" rel="noreferrer" target="_blank">
						<Envelope className="svg-social-icons" size={SOCIAL_ICON_SIZE} width="bold" />
					</a>
				</div>
			</div>
		</div>
	);
}
