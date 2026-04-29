"use client";

import Image from "next/image";

export default function Experience() {
	return (
		<section
			id="experience"
			className="scroll-mt-32 pt-20">
			<p className="text-center text-gray-600 font-semibold">Explore My</p>
			<h2 className="text-5xl text-center font-bold mb-10 title">Experience</h2>
			<div className="flex flex-col lg:flex-row gap-8 justify-center">
				<div className="flex-1 bg-white border border-gray-300 rounded-3xl p-8 text-center shadow-sm experience-details-container">
					<h2 className="text-gray-600 font-semibold text-2xl mb-8">
						Frontend Development
					</h2>
					<div className="flex flex-wrap gap-8 justify-around text-left">
						{[
							{ name: "HTML", level: "Experienced" },
							{ name: "CSS", level: "Experienced" },
							{ name: "SASS", level: "Intermediate" },
							{ name: "JavaScript", level: "Basic" },
							{ name: "TypeScript", level: "Basic" },
							{ name: "Tailwind", level: "Intermediate" },
						].map((skill, index) => (
							<article
								key={skill.name}
								className="flex items-start gap-4 w-36">
								<Image
									src="/assets/checkmark.png"
									alt="checkmark"
									width={24}
									height={24}
									className="h-6 w-auto mt-1"
								/>
								<div>
									<h3 className="font-bold">{skill.name}</h3>
									<p className="text-gray-600 text-sm">{skill.level}</p>
								</div>
							</article>
						))}
					</div>
				</div>
				<div className="flex-1 bg-white border border-gray-300 rounded-3xl p-8 text-center shadow-sm experience-details-container">
					<h2 className="text-gray-600 font-semibold text-2xl mb-8">
						Backend Development
					</h2>
					<div className="flex flex-wrap gap-8 justify-around text-left">
						{[
							{ name: "MongoDB", level: "Basic" },
							{ name: "Node JS", level: "Intermediate" },
							{ name: "Express JS", level: "Intermediate" },
							{ name: "React JS", level: "Intermediate" },
							{ name: "Next JS", level: "Intermediate" },
							{ name: "Git", level: "Intermediate" },
						].map((skill, index) => (
							<article
								key={skill.name}
								className="flex items-start gap-4 w-36">
								<Image
									src="/assets/checkmark.png"
									alt="checkmark"
									width={24}
									height={24}
									className="h-6 w-auto mt-1"
								/>
								<div>
									<h3 className="font-bold">{skill.name}</h3>
									<p className="text-gray-600 text-sm">{skill.level}</p>
								</div>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
