"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { projectsData, type Project } from "../app/projects/data";

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
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
				{projectsData.map((project) => (
					<article
						className="bg-[#fafafa] border border-gray-300 rounded-3xl p-6 text-center project-card shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
						key={project.id}
						aria-label={project.title}>
						<div>
							<div className="overflow-hidden rounded-2xl mb-5 relative aspect-video">
								<Image
									src={project.image}
									alt={project.imageAlt || `${project.title} Preview`}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-110"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
								/>
								{project.isOpenSource && (
									<span className="absolute top-3 right-3 bg-emerald-600/90 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow backdrop-blur-sm tracking-wide">
										Open Source
									</span>
								)}
							</div>

							<h3 className="text-2xl font-bold text-black mb-2">
								{project.title}
							</h3>
							<p className="text-gray-600 text-sm mb-4 line-clamp-2 text-center px-1">
								{project.description}
							</p>
						</div>

						{/* View More Button */}
						<div className="flex justify-center mt-2">
							<button
								className={`${btnClass} w-full text-black bg-transparent`}
								onClick={() => setSelectedProject(project)}>
								View More / Details
							</button>
						</div>
					</article>
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
							className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 relative max-h-[88vh] overflow-y-auto shadow-2xl my-auto animate-in fade-in zoom-in duration-200 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
							onClick={(e) => e.stopPropagation()}>
							{/* Top Right Close Button */}
							<button
								onClick={() => setSelectedProject(null)}
								className="absolute top-4 right-5 text-gray-500 hover:text-black hover:bg-gray-200 transition-all text-xl font-bold w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 cursor-pointer z-10"
								aria-label="Close modal">
								✕
							</button>

							{/* Title & Badges */}
							<div className="flex flex-wrap items-center gap-3 mb-2 pr-10">
								<h3 className="text-3xl font-bold text-black">
									{selectedProject.title}
								</h3>
								{selectedProject.isOpenSource && (
									<span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-300">
										Open Source
									</span>
								)}
								{selectedProject.license && (
									<span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-300">
										{selectedProject.license}
									</span>
								)}
							</div>

							{/* Modal Image */}
							<div className="relative aspect-video w-full rounded-xl overflow-hidden my-4 border border-gray-200 shadow-sm">
								<Image
									src={selectedProject.image}
									alt={selectedProject.imageAlt || selectedProject.title}
									fill
									className="object-cover"
								/>
							</div>

							{/* Description */}
							<p className="text-gray-700 mb-6 text-base leading-relaxed text-left">
								{selectedProject.description}
							</p>

							{/* Highlights (if any) */}
							{selectedProject.highlights &&
								selectedProject.highlights.length > 0 && (
									<div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-2xl text-left">
										<h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
											Key Highlights & Performance:
										</h4>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
											{selectedProject.highlights.map((item, index) => (
												<div
													key={index}
													className="flex items-start gap-2 text-xs font-medium text-gray-800 bg-white p-2.5 rounded-xl border border-gray-200 shadow-2xs">
													<span className="text-emerald-600 font-bold">✓</span>
													<span>{item}</span>
												</div>
											))}
										</div>
									</div>
								)}

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

							{/* Key Features (if any) */}
							{selectedProject.features &&
								selectedProject.features.length > 0 && (
									<div className="mb-6 text-left">
										<h4 className="text-lg font-semibold mb-2 text-black">
											Key Features & Capabilities:
										</h4>
										<ul className="list-disc list-inside text-gray-600 text-sm space-y-1.5">
											{selectedProject.features.map((feature, index) => (
												<li
													key={index}
													className="leading-relaxed">
													{feature}
												</li>
											))}
										</ul>
									</div>
								)}

							{/* Challenges Faced */}
							<div className="mb-6 text-left">
								<h4 className="text-lg font-semibold mb-2 text-black">
									Technical Challenges Faced:
								</h4>
								<ul className="list-disc list-inside text-gray-600 text-sm space-y-1.5">
									{selectedProject.challenges.map((challenge, index) => (
										<li
											key={index}
											className="leading-relaxed">
											{challenge}
										</li>
									))}
								</ul>
							</div>

							{/* Future Plans */}
							<div className="mb-6 text-left">
								<h4 className="text-lg font-semibold mb-2 text-black">
									Future Plans & Roadmap:
								</h4>
								<ul className="list-disc list-inside text-gray-600 text-sm space-y-1.5">
									{selectedProject.futurePlans.map((plan, index) => (
										<li
											key={index}
											className="leading-relaxed">
											{plan}
										</li>
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
										Live Website / Demo
									</a>
									<a
										href={selectedProject.github}
										target="_blank"
										rel="noopener noreferrer"
										className={`${btnClass} text-black bg-transparent`}>
										GitHub Repository
									</a>
									<Link
										href={`/projects/${selectedProject.id}`}
										className={`${btnClass} text-gray-700 bg-gray-100 hover:bg-gray-200 border-gray-200`}>
										Full Case Study →
									</Link>
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
