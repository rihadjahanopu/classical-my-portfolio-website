"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { projectsData, type Project } from "../app/projects/data";
import { useTheme } from "./ThemeProvider";
import GladeshellBenchmark from "./GladeshellBenchmark";
import ArchitectureSlider from "./ArchitectureSlider";
import { Magnetic } from "./MagneticButton";
import {
	GlobeIcon,
	BotIcon,
	SearchIcon,
	ExternalLinkIcon,
} from "./Icons";

type CategoryFilter = "all" | "rust" | "fullstack" | "ai";

export default function Projects() {
	const { playClick, showToast } = useTheme();
	const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Handle body scroll locking and Lenis disable when modal is open
	useEffect(() => {
		if (selectedProject) {
			document.body.style.overflow = "hidden";
			document.documentElement.style.overflow = "hidden";
			if (typeof window !== "undefined") {
				(window as unknown as { __lenis?: { stop: () => void } }).__lenis?.stop();
			}
		} else {
			document.body.style.overflow = "";
			document.documentElement.style.overflow = "";
			if (typeof window !== "undefined") {
				(window as unknown as { __lenis?: { start: () => void } }).__lenis?.start();
			}
		}
		return () => {
			document.body.style.overflow = "";
			document.documentElement.style.overflow = "";
			if (typeof window !== "undefined") {
				(window as unknown as { __lenis?: { start: () => void } }).__lenis?.start();
			}
		};
	}, [selectedProject]);

	// Filter projects
	const filteredProjects = useMemo(() => {
		// Put gladeshell first as the signature flagship
		const ordered = [...projectsData].sort((a, b) => (b.id === 4 ? 1 : 0) - (a.id === 4 ? 1 : 0));
		if (activeCategory === "all") return ordered;
		if (activeCategory === "rust") return ordered.filter((p) => p.id === 4);
		if (activeCategory === "ai") return ordered.filter((p) => p.id === 3);
		if (activeCategory === "fullstack") return ordered.filter((p) => p.id === 1 || p.id === 2);
		return ordered;
	}, [activeCategory]);

	// Category counts
	const counts = useMemo(
		() => ({
			all: projectsData.length,
			rust: projectsData.filter((p) => p.id === 4).length,
			fullstack: projectsData.filter((p) => p.id === 1 || p.id === 2).length,
			ai: projectsData.filter((p) => p.id === 3).length,
		}),
		[]
	);

	const btnClass =
		"font-semibold transition-all duration-300 px-5 py-2.5 rounded-full border border-gray-300 dark:border-white/15 flex justify-center items-center cursor-pointer text-xs sm:text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black";

	return (
		<section
			id="projects"
			className="scroll-mt-32 pt-20 pb-16 w-full">
			{/* Header */}
			<div className="text-center mb-8">
				<p className="text-sm font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">
					Engineered Systems & Products
				</p>
				<h2 className="text-4xl md:text-5xl font-bold tracking-tight title text-gray-900 dark:text-white mt-1">
					Featured Projects
				</h2>
				<p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto">
					Selected works spanning ultra-low-latency pure Rust shell architecture, agentic AI workspaces, and full-stack platforms.
				</p>
			</div>

			{/* Category Filter Pills */}
			<div className="flex flex-wrap items-center justify-center gap-2 mb-10">
				{[
					{ id: "all", label: "All Projects", count: counts.all, icon: null },
					{ id: "rust", label: "Rust & Systems", count: counts.rust, icon: <span className="text-sm select-none leading-none">🦀</span> },
					{ id: "fullstack", label: "Full-Stack Web", count: counts.fullstack, icon: <GlobeIcon className="w-3.5 h-3.5 text-blue-500" /> },
					{ id: "ai", label: "Agentic AI", count: counts.ai, icon: <BotIcon className="w-3.5 h-3.5 text-purple-500" /> },
				].map((filter) => {
					const isActive = activeCategory === filter.id;
					return (
						<Magnetic key={filter.id} strength={0.25}>
							<button
								onClick={() => {
									playClick();
									setActiveCategory(filter.id as CategoryFilter);
								}}
								className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
									isActive
										? "bg-black text-white dark:bg-white dark:text-black shadow-md scale-105"
										: "bg-white/80 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
								}`}>
								{filter.icon}
								<span>{filter.label}</span>
								<span
									className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
										isActive
											? "bg-white/20 text-white dark:bg-black/20 dark:text-black"
											: "bg-gray-200/60 dark:bg-white/10 text-gray-600 dark:text-gray-400"
									}`}>
									{filter.count}
								</span>
							</button>
						</Magnetic>
					);
				})}
			</div>

			{/* Projects Cards Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-6xl mx-auto">
				{filteredProjects.map((project) => (
					<article
						key={project.id}
						className="group relative bg-[var(--bg-card)]/85 backdrop-blur-md border border-[var(--border-color)] rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between project-card overflow-hidden"
						aria-label={project.title}>
						{/* Ambient hover glow */}
						<div className="absolute -inset-px rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-purple-500/10 pointer-events-none" />

						<div className="relative z-10">
							{/* Image preview with aspect-video */}
							<div className="overflow-hidden rounded-xl sm:rounded-2xl mb-4 sm:mb-5 relative aspect-video border border-[var(--border-color)] bg-white/5">
								<Image
									src={project.image}
									alt={project.imageAlt || `${project.title} Preview`}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-105"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								/>
								{project.isOpenSource && (
									<span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-emerald-600/95 text-white text-[10px] sm:text-[11px] font-mono font-semibold px-2 sm:px-2.5 py-0.5 rounded-full shadow backdrop-blur-sm">
										Pure Rust Open Source (MIT)
									</span>
								)}
								{project.id === 3 && (
									<span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-purple-600/95 text-white text-[10px] sm:text-[11px] font-mono font-semibold px-2 sm:px-2.5 py-0.5 rounded-full shadow backdrop-blur-sm">
										Agentic Gemini AI
									</span>
								)}
							</div>

							{/* Title & Badges */}
							<div className="flex items-baseline justify-between gap-2 mb-1.5 sm:mb-2">
								<h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
									{project.title}
								</h3>
								{project.license && (
									<span className="text-[10px] font-mono text-[var(--text-muted)] border border-[var(--border-color)] px-2 py-0.5 rounded-full shrink-0">
										{project.license}
									</span>
								)}
							</div>

							{/* Description */}
							<p className="text-[var(--text-secondary)] text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
								{project.description}
							</p>

							{/* Tech stack badges */}
							<div className="flex flex-wrap gap-1.5 mb-4 sm:mb-6">
								{project.techStack.slice(0, 4).map((tech) => (
									<span
										key={tech}
										className="text-[10px] sm:text-[11px] font-mono px-2 sm:px-2.5 py-0.5 rounded-md bg-white/5 text-[var(--text-secondary)] border border-[var(--border-color)]">
										{tech}
									</span>
								))}
								{project.techStack.length > 4 && (
									<span className="text-[10px] sm:text-[11px] font-mono px-1.5 py-0.5 text-[var(--text-muted)]">
										+{project.techStack.length - 4} more
									</span>
								)}
							</div>
						</div>

						{/* Action Buttons */}
						<div className="relative z-10 grid grid-cols-2 gap-2 sm:gap-3 pt-3 border-t border-[var(--border-color)]">
							<Magnetic strength={0.25} className="w-full">
								<button
									onClick={() => {
										playClick();
										setSelectedProject(project);
									}}
									className="w-full py-2.5 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold border border-[var(--border-color)] bg-white/5 hover:bg-white/10 text-[var(--text-primary)] transition-all cursor-pointer truncate flex items-center justify-center gap-1.5">
									<SearchIcon className="w-3.5 h-3.5 text-gray-400" />
									<span>Inspect</span>
								</button>
							</Magnetic>

							<Magnetic strength={0.25} className="w-full">
								<Link
									href={`/projects/${project.id}`}
									onClick={playClick}
									className="w-full py-2.5 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold bg-[var(--accent-primary)] text-white hover:opacity-90 transition-all text-center flex items-center justify-center gap-1 truncate">
									<span>Case Study</span>
									<span>→</span>
								</Link>
							</Magnetic>
						</div>
					</article>
				))}
			</div>

			{/* ============================================================ */}
			{/* SIGNATURE ENGINEERING SHOWCASE: BENCHMARKS & ARCHITECTURE SLIDER */}
			{/* ============================================================ */}
			<div className="mt-16 pt-12 border-t border-gray-200/70 dark:border-white/10">
				<GladeshellBenchmark />
				<ArchitectureSlider />
			</div>

			{/* ============================================================ */}
			{/* REACT PORTAL DETAIL MODAL */}
			{/* ============================================================ */}
			{mounted &&
				selectedProject &&
				createPortal(
					<div
						data-lenis-prevent="true"
						className="fixed inset-0 z-[9999] w-full h-full bg-black/70 backdrop-blur-md flex justify-center items-center p-3 sm:p-6 animate-in fade-in duration-200 overscroll-contain"
						onClick={() => setSelectedProject(null)}
						onWheel={(e) => e.stopPropagation()}
						onTouchMove={(e) => e.stopPropagation()}>
						<div
							data-lenis-prevent="true"
							className="bg-[var(--bg-card)] text-[var(--text-primary)] rounded-2xl sm:rounded-3xl max-w-2xl w-full p-4 sm:p-8 relative max-h-[92vh] overflow-y-auto overscroll-contain shadow-2xl my-auto border border-[var(--border-color)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden animate-in zoom-in-95 duration-200"
							onClick={(e) => e.stopPropagation()}
							onWheel={(e) => e.stopPropagation()}>
							{/* Close Button */}
							<div className="absolute top-3 right-3 sm:top-4 sm:right-5 z-10">
								<Magnetic strength={0.3}>
									<button
										onClick={() => setSelectedProject(null)}
										className="text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all text-base sm:text-lg font-bold w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/10 cursor-pointer"
										aria-label="Close modal">
										✕
									</button>
								</Magnetic>
							</div>

							{/* Title & Badges */}
							<div className="pr-10 mb-3 sm:mb-4">
								<span className="text-[10px] sm:text-xs font-mono text-emerald-500 uppercase tracking-wider">
									Project Inspection
								</span>
								<h3 className="text-xl sm:text-3xl font-bold mt-0.5 sm:mt-1 text-[var(--text-primary)]">
									{selectedProject.title}
								</h3>
							</div>

							{/* Modal Image */}
							<div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-6 border border-gray-200 dark:border-white/10 shadow-sm">
								<Image
									src={selectedProject.image}
									alt={selectedProject.imageAlt || selectedProject.title}
									fill
									className="object-cover"
								/>
							</div>

							{/* Description */}
							<p className="text-gray-700 dark:text-gray-300 mb-6 text-sm sm:text-base leading-relaxed text-left">
								{selectedProject.description}
							</p>

							{/* Highlights if any */}
							{selectedProject.highlights && selectedProject.highlights.length > 0 && (
								<div className="mb-6 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-left">
									<h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3 font-mono">
										Key Highlights & Empirical Performance:
									</h4>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
										{selectedProject.highlights.map((item, index) => (
											<div
												key={index}
												className="flex items-start gap-2 text-xs font-medium text-gray-800 dark:text-gray-200 bg-white/80 dark:bg-white/5 p-2.5 rounded-xl border border-gray-200/50 dark:border-white/10">
												<span className="text-emerald-500 font-bold">✓</span>
												<span>{item}</span>
											</div>
										))}
									</div>
								</div>
							)}

							{/* Tech Stack */}
							<div className="mb-6 text-left">
								<h4 className="text-sm font-semibold mb-2.5 text-gray-900 dark:text-white">
									Technologies & Crates Used:
								</h4>
								<div className="flex flex-wrap gap-1.5">
									{selectedProject.techStack.map((tech, index) => (
										<span
											key={index}
											className="bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-200 text-xs font-mono px-3 py-1 rounded-lg border border-gray-200 dark:border-white/10">
											{tech}
										</span>
									))}
								</div>
							</div>

							{/* Key Features */}
							{selectedProject.features && selectedProject.features.length > 0 && (
								<div className="mb-6 text-left">
									<h4 className="text-sm font-semibold mb-2.5 text-gray-900 dark:text-white">
										Core Capabilities:
									</h4>
									<ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
										{selectedProject.features.map((feature, index) => (
											<li key={index} className="flex items-start gap-2 leading-relaxed">
												<span className="text-blue-500">•</span>
												<span>{feature}</span>
											</li>
										))}
									</ul>
								</div>
							)}

							{/* Challenges & Solutions */}
							<div className="mb-6 text-left">
								<h4 className="text-sm font-semibold mb-2.5 text-gray-900 dark:text-white">
									Engineering Challenges Overcome:
								</h4>
								<ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
									{selectedProject.challenges.map((challenge, index) => (
										<li key={index} className="flex items-start gap-2 leading-relaxed">
											<span className="text-amber-500 font-bold">⚡</span>
											<span>{challenge}</span>
										</li>
									))}
								</ul>
							</div>

							{/* Action Links */}
							<div className="flex flex-col sm:flex-row gap-3 pt-5 sm:pt-6 border-t border-[var(--border-color)] justify-between items-center w-full">
								<div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2 sm:gap-2.5 w-full sm:w-auto">
									<Magnetic strength={0.25} className="w-full sm:w-auto">
										<a
											href={selectedProject.liveDemo}
											target="_blank"
											rel="noopener noreferrer"
											onClick={() => {
												playClick();
												showToast("Opening Live Demo");
											}}
											className={`${btnClass} w-full sm:w-auto bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent text-center justify-center flex items-center gap-1.5`}>
											<span>Live Demo</span>
											<ExternalLinkIcon className="w-3.5 h-3.5" />
										</a>
									</Magnetic>

									<Magnetic strength={0.25} className="w-full sm:w-auto">
										<a
											href={selectedProject.github}
											target="_blank"
											rel="noopener noreferrer"
											onClick={() => {
												playClick();
												showToast("Opening GitHub Repository");
											}}
											className={`${btnClass} w-full sm:w-auto text-center justify-center flex items-center gap-1.5`}>
											<span>GitHub Repo</span>
											<ExternalLinkIcon className="w-3.5 h-3.5" />
										</a>
									</Magnetic>

									<Magnetic strength={0.25} className="w-full sm:w-auto">
										<Link
											href={`/projects/${selectedProject.id}`}
											onClick={playClick}
											className={`${btnClass} w-full sm:w-auto bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border-[var(--accent-primary)]/20 text-center justify-center`}>
											Case Study →
										</Link>
									</Magnetic>
								</div>

								<Magnetic strength={0.25} className="w-full sm:w-auto">
									<button
										onClick={() => setSelectedProject(null)}
										className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer px-3 py-2 w-full sm:w-auto text-center">
										Close ✕
									</button>
								</Magnetic>
							</div>
						</div>
					</div>,
					document.body
				)}
		</section>
	);
}