import Image from 'next/image';
import styles from '../../../../../../../styles/MainText.module.css';

export default function MainText() {
	return (
		<div className="relative flex min-h-screen flex-col justify-center">
			<Image
				alt="Profile Pic"
				className="rounded-lg block mx-auto shadow-current"
				height={200}
				src="https://cdn.discordapp.com/avatars/485912377574031370/e5fd6b9374aa0faf32a7b9150759e815.png?size=1024"
				width={200}
			/>
			<div className="relative text-center pt-7 text-5xl font-bold">
				<span className="text-zinc-200 hover:text-teal-50">J</span>
				<span className="text-zinc-200 hover:text-teal-100">P</span>
				<span className="text-zinc-200 hover:text-teal-200">B</span>
				<span className="text-zinc-200 hover:text-teal-400">M</span>
				<span className="text-zinc-200 hover:text-teal-500">1</span>
				<span className="text-zinc-200 hover:text-teal-600">3</span>
				<span className="text-zinc-200 hover:text-teal-700">5</span>
			</div>
			<div className="relative text-center pt-2 text-3xl font-bold">
				<span className="text-zinc-200 hover:text-teal-900">D</span>
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
	);
}
