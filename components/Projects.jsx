"use client";

import Image from "next/image";

export default function Projects() {
	const btnClass =
		"font-semibold transition-all duration-300 p-3 w-32 rounded-full border-2 border-[#353535] flex justify-center items-center cursor-pointer text-sm";

	return (
		<section
			id="projects"
			className="scroll-mt-32 pt-20">
			<p className="text-center text-gray-600 font-semibold">Browse My Recent</p>
			<h2 className="text-5xl text-center font-bold mb-10 title">Projects</h2>
			<div className="flex flex-col lg:flex-row gap-8 justify-center">
				{[1, 2, 3].map((num) => (
					<div
						className="flex-1 bg-[#fafafa] border border-gray-300 rounded-3xl p-6 text-center project-card shadow-sm hover:shadow-lg transition-all duration-300 group"
						key={num}>
						<div className="overflow-hidden rounded-2xl mb-6 relative aspect-video">
							<Image
								src={`/assets/project-${num}.png`}
								alt={`Project ${num}`}
								fill
								className="object-cover transition-transform duration-500 group-hover:scale-110"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>
						</div>
						<h2 className="text-2xl font-bold text-black mb-6">
							Project {["One", "Two", "Three"][num - 1]}
						</h2>
						<div className="flex flex-wrap justify-center gap-4">
							<button
								className={`${btnClass} text-black bg-transparent w-auto px-6 py-3`}
								onClick={() => (window.location.href = "https://github.com/")}>
								Github
							</button>
							<button
								className={`${btnClass} text-black bg-transparent w-auto px-6 py-3`}
								onClick={() => (window.location.href = "https://github.com/")}>
								Live Demo
							</button>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
