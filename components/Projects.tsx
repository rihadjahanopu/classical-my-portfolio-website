"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// প্রজেক্ট ডাটার টাইপ ডেফিনিশন
interface Project {
	id: number;
	title: string;
	image: string;
	github: string;
	liveDemo: string;
	techStack: string[];
	description: string;
	challenges: string[];
	futurePlans: string[];
}

// আপনার প্রজেক্টসমূহের ডাটা
const projectsData: Project[] = [
	{
		id: 1,
		title: "Project One",
		image: "/assets/project-1.png",
		github: "https://github.com/your-username/project-1",
		liveDemo: "https://project-1-demo.com",
		techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
		description:
			"An interactive full-stack web application designed for seamlessly managing daily tasks and projects.",
		challenges: [
			"Handling real-time state synchronization across multiple devices.",
			"Optimizing dynamic images for faster loading speeds.",
		],
		futurePlans: [
			"Add AI-assisted task auto-categorization.",
			"Implement team collaboration features with web sockets.",
		],
	},
	{
		id: 2,
		title: "Project Two",
		image: "/assets/project-2.png",
		github: "https://github.com/your-username/project-2",
		liveDemo: "https://project-2-demo.com",
		techStack: ["React", "Redux Toolkit", "Node.js", "Express"],
		description:
			"An e-commerce platform offering a smooth checkout experience and real-time inventory updates.",
		challenges: [
			"Integrating complex payment gateways securely.",
			"Structuring Redux store to manage cart state efficiently.",
		],
		futurePlans: [
			"Integrate dark mode support.",
			"Implement multi-currency payment options.",
		],
	},
	{
		id: 3,
		title: "Project Three",
		image: "/assets/project-3.png",
		github: "https://github.com/your-username/project-3",
		liveDemo: "https://project-3-demo.com",
		techStack: ["Next.js", "Tailwind CSS", "Firebase"],
		description:
			"A blogging dashboard with rich text editing, user authorization, and dynamic rendering.",
		challenges: [
			"Configuring complex Firebase security rules.",
			"Optimizing SEO for dynamically generated blog routes.",
		],
		futurePlans: [
			"Add automated newsletter emails for new posts.",
			"Include a comment rating and moderation dashboard.",
		],
	},
];

export default function Projects() {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [mounted, setMounted] = useState(false);

	// SSR পোর্টাল হ্যান্ডেল করার জন্য মাউন্ট চেক
	useEffect(() => {
		setMounted(true);
	}, []);

	// মোডাল ওপেন থাকলে মেইন পেজের স্ক্রোল বন্ধ রাখার লজিক
	useEffect(() => {
		if (selectedProject) {
			document.body.style.overflow = "hidden";
			document.documentElement.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
			document.documentElement.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
			document.documentElement.style.overflow = "unset";
		};
	}, [selectedProject]);

	const btnClass =
		"font-semibold transition-all duration-300 px-6 py-2.5 rounded-full border-2 border-[#353535] flex justify-center items-center cursor-pointer text-sm hover:bg-[#353535] hover:text-white";

	return (
		<section
			id="projects"
			className="scroll-mt-32 pt-20 pb-16 px-4">
			<p className="text-center text-gray-600 font-semibold">
				Browse My Recent
			</p>
			<h2 className="text-5xl text-center font-bold mb-10 title">Projects</h2>

			{/* Projects Cards Grid */}
			<div className="flex flex-col lg:flex-row gap-8 justify-center max-w-6xl mx-auto">
				{projectsData.map((project) => (
					<div
						className="flex-1 bg-[#fafafa] border border-gray-300 rounded-3xl p-6 text-center project-card shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
						key={project.id}>
						<div>
							<div className="overflow-hidden rounded-2xl mb-6 relative aspect-video">
								<Image
									src={project.image}
									alt={project.title}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-110"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								/>
							</div>

							<h3 className="text-2xl font-bold text-black mb-4">
								{project.title}
							</h3>
						</div>

						{/* View More Button */}
						<div className="flex justify-center mt-4">
							<button
								className={`${btnClass} w-full text-black bg-transparent`}
								onClick={() => setSelectedProject(project)}>
								View More / Details
							</button>
						</div>
					</div>
				))}
			</div>

			{/* React Portal Modal */}
			{mounted &&
				selectedProject &&
				createPortal(
					<div
						className="fixed inset-0 z-9999 w-full h-full bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 sm:p-6"
						onClick={() => setSelectedProject(null)}>
						{/* Modal Content Box (Scrollable with Hidden Scrollbar) */}
						<div
							className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 relative max-h-[85vh] overflow-y-auto shadow-2xl my-auto animate-in fade-in zoom-in duration-200 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
							onClick={(e) => e.stopPropagation()}>
							{/* Top Right Close Button */}
							<button
								onClick={() => setSelectedProject(null)}
								className="absolute top-4 right-5 text-gray-500 hover:text-black hover:bg-gray-200 transition-all text-xl font-bold w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 cursor-pointer z-10"
								aria-label="Close modal">
								✕
							</button>

							<h3 className="text-3xl font-bold text-black mb-2">
								{selectedProject.title}
							</h3>

							{/* Modal Image */}
							<div className="relative aspect-video w-full rounded-xl overflow-hidden my-4 border border-gray-200">
								<Image
									src={selectedProject.image}
									alt={selectedProject.title}
									fill
									className="object-cover"
								/>
							</div>

							{/* Description */}
							<p className="text-gray-700 mb-6 text-base leading-relaxed text-left">
								{selectedProject.description}
							</p>

							{/* Tech Stack */}
							<div className="mb-6 text-left">
								<h4 className="text-lg font-semibold mb-2 text-black">
									Technologies Used:
								</h4>
								<div className="flex flex-wrap gap-2">
									{selectedProject.techStack.map((tech, index) => (
										<span
											key={index}
											className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full border border-gray-300">
											{tech}
										</span>
									))}
								</div>
							</div>

							{/* Challenges Faced */}
							<div className="mb-6 text-left">
								<h4 className="text-lg font-semibold mb-2 text-black">
									Challenges Faced:
								</h4>
								<ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
									{selectedProject.challenges.map((challenge, index) => (
										<li key={index}>{challenge}</li>
									))}
								</ul>
							</div>

							{/* Future Plans */}
							<div className="mb-6 text-left">
								<h4 className="text-lg font-semibold mb-2 text-black">
									Future Plans & Improvements:
								</h4>
								<ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
									{selectedProject.futurePlans.map((plan, index) => (
										<li key={index}>{plan}</li>
									))}
								</ul>
							</div>

							{/* Action Buttons */}
							<div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 justify-between items-center">
								<div className="flex flex-wrap gap-3">
									<a
										href={selectedProject.liveDemo}
										target="_blank"
										rel="noopener noreferrer"
										className={`${btnClass} text-white bg-black hover:bg-gray-800`}>
										Live Project
									</a>
									<a
										href={selectedProject.github}
										target="_blank"
										rel="noopener noreferrer"
										className={`${btnClass} text-black bg-transparent`}>
										GitHub Repository
									</a>
								</div>

								{/* Bottom Close Button */}
								<button
									onClick={() => setSelectedProject(null)}
									className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all text-sm font-semibold cursor-pointer">
									Close
								</button>
							</div>
						</div>
					</div>,
					document.body
				)}
		</section>
	);
}
