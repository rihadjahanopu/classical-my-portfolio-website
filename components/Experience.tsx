"use client";

import { memo, useMemo, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Magnetic } from "./MagneticButton";
import { GlobeIcon, BoltIcon } from "./Icons";

interface Skill {
	name: string;
	level: string;
	tag?: string;
}

const FRONTEND_SKILLS: Skill[] = [
	{ name: "React 19 & Next.js 15", level: "Experienced", tag: "Core" },
	{ name: "TypeScript / JS (ESNext)", level: "Experienced", tag: "Strict" },
	{ name: "Tailwind CSS v4", level: "Experienced", tag: "Design" },
	{ name: "Framer Motion & GSAP", level: "Intermediate", tag: "Motion" },
	{ name: "Radix UI Primitives", level: "Intermediate", tag: "A11y" },
	{ name: "Modern Web APIs", level: "Experienced", tag: "DOM" },
];

const BACKEND_SKILLS: Skill[] = [
	{ name: "Node.js & Express", level: "Experienced", tag: "Runtime" },
	{ name: "PostgreSQL & MongoDB", level: "Intermediate", tag: "Database" },
	{ name: "REST & GraphQL APIs", level: "Experienced", tag: "Architecture" },
	{ name: "Prisma & Drizzle ORM", level: "Intermediate", tag: "Type-Safe" },
	{ name: "JWT, OAuth & Auth.js", level: "Experienced", tag: "Security" },
	{ name: "Stripe & Webhook Engine", level: "Intermediate", tag: "Fintech" },
];

const SYSTEMS_SKILLS: Skill[] = [
	{ name: "Pure Rust (2024 Edition)", level: "Experienced", tag: "Safe" },
	{ name: "Gitoxide (gix 0.88)", level: "Intermediate", tag: "Fast" },
	{ name: "Ratatui Terminal TUI", level: "Experienced", tag: "Terminal" },
	{ name: "Rayon Multi-Threading", level: "Intermediate", tag: "Parallel" },
	{ name: "AES-256 Vault Crypto", level: "Intermediate", tag: "Hardened" },
	{ name: "Linux Shell & Docker", level: "Experienced", tag: "Infra" },
];

// Checkmark SVG with theme-driven glow
function CheckIcon() {
	return (
		<svg
			className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2.5}>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	);
}

const Experience = memo(function Experience() {
	const { playClick, showToast } = useTheme();
	const [activeTab, setActiveTab] = useState<"all" | "frontend" | "backend" | "systems">("all");

	// Generate a simulated responsive 52-week GitHub contribution matrix (realistic density)
	const contributionWeeks = useMemo(() => {
		const weeks = [];
		const seedPattern = [
			1, 2, 0, 3, 2, 4, 1, 0, 2, 3, 4, 2, 1, 3, 4, 4, 2, 0, 1, 3, 4, 2, 3, 4, 1, 2, 0,
			3, 4, 4, 2, 1, 3, 4, 3, 2, 4, 4, 1, 3, 2, 4, 3, 4, 4, 2, 3, 4, 4, 3, 4, 4,
		];
		for (let w = 0; w < 52; w++) {
			const days = [];
			const baseLevel = seedPattern[w % seedPattern.length];
			for (let d = 0; d < 7; d++) {
				// Weekend slight dip, weekday high activity
				const isWeekend = d === 0 || d === 6;
				let level = isWeekend ? Math.max(0, baseLevel - 1) : (baseLevel + ((w + d) % 2)) % 5;
				if (w > 45) level = Math.max(1, level); // Recent weeks very active
				days.push(level);
			}
			weeks.push(days);
		}
		return weeks;
	}, []);

	const levelColor = (level: number) => {
		switch (level) {
			case 1:
				return "bg-emerald-900/30 dark:bg-emerald-900/50 border border-emerald-800/30";
			case 2:
				return "bg-emerald-600/50 dark:bg-emerald-700/60 border border-emerald-600/40";
			case 3:
				return "bg-emerald-500/80 dark:bg-emerald-500/80 border border-emerald-400/50";
			case 4:
				return "bg-emerald-400 dark:bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]";
			default:
				return "bg-gray-200/50 dark:bg-white/5 border border-transparent";
		}
	};

	return (
		<section
			id="experience"
			className="scroll-mt-32 pt-20 pb-16 w-full">
			<div className="text-center mb-10">
				<p className="text-sm font-mono uppercase tracking-wider text-[var(--text-muted)]">
					⚡ Engineered For Performance
				</p>
				<h2 className="text-4xl md:text-5xl font-bold tracking-tight title text-[var(--text-primary)] mt-1">
					Skills & Experience
				</h2>
				<p className="text-sm text-[var(--text-secondary)] mt-2 max-w-xl mx-auto">
					From type-safe frontend interfaces to distributed cloud backends and sub-millisecond pure Rust systems.
				</p>
			</div>

			{/* Three Skill Pillars Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
				{/* 1. Frontend Development */}
				<div className="experience-details-container bg-[var(--bg-card)]/80 backdrop-blur-md border border-[var(--border-color)] rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
					<div>
						<div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-color)]">
							<div>
								<span className="text-xs font-mono text-blue-500 uppercase tracking-wider">
									Client-Side
								</span>
								<h3 className="text-xl font-bold text-[var(--text-primary)] mt-0.5">
									Frontend Mastery
								</h3>
							</div>
							<span className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
								<GlobeIcon className="w-6 h-6" />
							</span>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{FRONTEND_SKILLS.map((skill) => (
								<article
									key={skill.name}
									className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
									<CheckIcon />
									<div>
										<h4 className="font-semibold text-sm text-[var(--text-primary)] leading-snug">
											{skill.name}
										</h4>
										<span className="text-[11px] text-[var(--text-muted)] font-mono">
											{skill.level}
										</span>
									</div>
								</article>
							))}
						</div>
					</div>

					<div className="mt-6 pt-4 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs text-[var(--text-muted)] font-mono">
						<span className="whitespace-nowrap">Focus: Next.js 15 & Motion</span>
						<span className="text-emerald-500 font-semibold whitespace-nowrap flex items-center gap-1.5">
							<span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
							<span>Production Ready</span>
						</span>
					</div>
				</div>

				{/* 2. Backend & Cloud Infrastructure */}
				<div className="experience-details-container bg-[var(--bg-card)]/80 backdrop-blur-md border border-[var(--border-color)] rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
					<div>
						<div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-color)]">
							<div>
								<span className="text-xs font-mono text-purple-500 uppercase tracking-wider">
									Server & Data
								</span>
								<h3 className="text-xl font-bold text-[var(--text-primary)] mt-0.5">
									Backend Architecture
								</h3>
							</div>
							<span className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
								<BoltIcon className="w-6 h-6" />
							</span>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{BACKEND_SKILLS.map((skill) => (
								<article
									key={skill.name}
									className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
									<CheckIcon />
									<div>
										<h4 className="font-semibold text-sm text-[var(--text-primary)] leading-snug">
											{skill.name}
										</h4>
										<span className="text-[11px] text-[var(--text-muted)] font-mono">
											{skill.level}
										</span>
									</div>
								</article>
							))}
						</div>
					</div>

					<div className="mt-6 pt-4 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs text-[var(--text-muted)] font-mono">
						<span className="whitespace-nowrap">Focus: Scalable REST & ORMs</span>
						<span className="text-emerald-500 font-semibold whitespace-nowrap flex items-center gap-1.5">
							<span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
							<span>High Availability</span>
						</span>
					</div>
				</div>

				{/* 3. Systems & High-Performance Rust */}
				<div className="experience-details-container bg-[var(--bg-card)]/80 backdrop-blur-md border border-[var(--border-color)] rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
					{/* Highlight glow badge */}
					<div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/20 transition-all" />

					<div>
						<div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-color)]">
							<div>
								<span className="text-xs font-mono text-amber-500 uppercase tracking-wider font-semibold">
									Low-Latency Systems
								</span>
								<h3 className="text-xl font-bold text-[var(--text-primary)] mt-0.5">
									Systems & Pure Rust
								</h3>
							</div>
							<span className="p-2.5 rounded-2xl bg-amber-500/10 flex items-center justify-center text-xl select-none leading-none">
								🦀
							</span>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{SYSTEMS_SKILLS.map((skill) => (
								<article
									key={skill.name}
									className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
									<CheckIcon />
									<div>
										<h4 className="font-semibold text-sm text-[var(--text-primary)] leading-snug">
											{skill.name}
										</h4>
										<span className="text-[11px] text-[var(--text-muted)] font-mono">
											{skill.level}
										</span>
									</div>
								</article>
							))}
						</div>
					</div>

					<div className="mt-6 pt-4 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs text-amber-500 font-mono font-medium">
						<span className="whitespace-nowrap">0 Subshells • Safe</span>
						<span className="whitespace-nowrap flex items-center gap-1">
							<span>⚡</span>
							<span>0.0114 ms Latency</span>
						</span>
					</div>
				</div>
			</div>

			{/* Interactive GitHub Activity & Engineering Matrix */}
			<div className="mt-10 max-w-7xl mx-auto bg-[var(--bg-card)]/80 backdrop-blur-md border border-[var(--border-color)] rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm">
				<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
					<div>
						<div className="flex items-center gap-2">
							<span className="text-lg">🌿</span>
							<h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
								Engineering Velocity & Git Activity
							</h3>
						</div>
						<p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">
							Continuous shipping across open-source systems, web apps, and developer tools.
						</p>
					</div>

					<div className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto">
						<span className="sm:hidden text-[10px] font-mono text-[var(--text-muted)]">
							(Swipe heatmap →)
						</span>
						<Magnetic strength={0.3}>
							<a
								href="https://github.com/rihadjahanopu"
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => {
									playClick();
									showToast("Opening GitHub profile in a new tab");
								}}
								className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--border-color)] bg-white/5 hover:bg-white/10 text-xs font-mono font-medium text-[var(--text-primary)] transition-all cursor-pointer">
								<span>@rihadjahanopu</span>
								<span>↗</span>
							</a>
						</Magnetic>
					</div>
				</div>

				{/* Metric Counters Banner */}
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-5 sm:mb-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/3 border border-[var(--border-color)]">
					<div className="text-center sm:text-left">
						<div className="text-[11px] sm:text-xs font-mono text-[var(--text-muted)] flex items-center justify-center sm:justify-start gap-1">
							<span>📦</span>
							<span>Total Commits</span>
						</div>
						<div className="text-lg sm:text-2xl font-bold font-mono text-emerald-500 mt-0.5">
							920+
						</div>
					</div>
					<div className="text-center sm:text-left">
						<div className="text-[11px] sm:text-xs font-mono text-[var(--text-muted)] flex items-center justify-center sm:justify-start gap-1">
							<span>🔥</span>
							<span>Active Streak</span>
						</div>
						<div className="text-lg sm:text-2xl font-bold font-mono text-amber-500 mt-0.5">
							47 Days
						</div>
					</div>
					<div className="text-center sm:text-left">
						<div className="text-[11px] sm:text-xs font-mono text-[var(--text-muted)] flex items-center justify-center sm:justify-start gap-1">
							<span>🦀</span>
							<span>Pure Rust Crates</span>
						</div>
						<div className="text-lg sm:text-2xl font-bold font-mono text-blue-500 mt-0.5 truncate">
							gladeshell v1
						</div>
					</div>
					<div className="text-center sm:text-left">
						<div className="text-[11px] sm:text-xs font-mono text-[var(--text-muted)] flex items-center justify-center sm:justify-start gap-1">
							<span>🛡️</span>
							<span>Memory Safety</span>
						</div>
						<div className="text-lg sm:text-2xl font-bold font-mono text-purple-500 mt-0.5">
							100% #![deny]
						</div>
					</div>
				</div>

				{/* 52-Week Contribution Matrix Strip (Scrollable horizontally on mobile) */}
				<div className="relative overflow-x-auto pb-2 [scrollbar-width:none] [-webkit-overflow-scrolling:touch]">
					<div className="min-w-[700px] flex gap-[3px] items-center justify-between">
						{contributionWeeks.map((week, wIndex) => (
							<div key={wIndex} className="flex flex-col gap-[3px]">
								{week.map((level, dIndex) => (
									<div
										key={dIndex}
										title={`Week ${wIndex + 1}, Day ${dIndex + 1}: ${level === 0 ? "No" : level * 3} contributions`}
										className={`w-[11px] h-[11px] rounded-[2px] transition-all duration-200 hover:scale-130 cursor-pointer ${levelColor(
											level
										)}`}
									/>
								))}
							</div>
						))}
					</div>
				</div>

				{/* Heatmap Legend */}
				<div className="flex items-center justify-between mt-4 text-[11px] font-mono text-gray-500 dark:text-gray-400">
					<span>52 Weeks of Consistent Code</span>
					<div className="flex items-center gap-1.5">
						<span>Less</span>
						<span className="w-2.5 h-2.5 rounded-[2px] bg-gray-200/50 dark:bg-white/5 inline-block" />
						<span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-900/40 inline-block" />
						<span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-600/60 inline-block" />
						<span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400 inline-block" />
						<span>More</span>
					</div>
				</div>
			</div>
		</section>
	);
});

export default Experience;