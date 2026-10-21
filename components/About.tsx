"use client";

import Image from "next/image";
import { BriefcaseIcon, AcademicCapIcon } from "./Icons";

export default function About() {
	return (
		<section
			id="about"
			className="scroll-mt-32 pt-20 pb-12 w-full">
			<p className="text-center text-[var(--text-muted)] font-semibold text-sm uppercase tracking-wider font-mono">
				👨‍💻 Get To Know More
			</p>
			<h2 className="text-4xl sm:text-5xl text-center font-black mb-12 title text-[var(--text-primary)]">
				About Me
			</h2>

			<div className="flex flex-col gap-10">
				{/* Picture and Bio */}
				<div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center justify-center">
					<div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden flex-shrink-0 about-image-co fancy-shadow relative border border-[var(--border-color)]">
						<Image
							src="/assets/aboutImage.png"
							alt="About Rihad Jahan Opu"
							fill
							className="object-cover"
							sizes="(max-width: 1024px) 320px, 384px"
						/>
					</div>

					<div className="flex-1 text-center lg:text-left text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed break-words space-y-4">
						<p>
							I&apos;m <strong className="text-[var(--text-primary)]">Rihad Jahan Opu</strong>, a passionate <strong className="text-[var(--text-primary)]">Full-Stack Web Developer</strong> dedicated to building scalable, modern web applications with <span className="text-[var(--accent-primary)] font-semibold">Next.js 15, React 19, TypeScript</span>, and cloud-native backend systems.
						</p>
						<p>
							I specialize in crafting pixel-perfect, accessible user interfaces with dynamic motion design (Tailwind CSS, Framer Motion, GSAP) while architecting reliable backend services—including REST/GraphQL APIs, database modeling (PostgreSQL, MongoDB), secure authentication, and payment workflows with a relentless focus on 100/100 Lighthouse performance.
						</p>
						<p>
							My engineering foundation is further sharpened by low-level systems programming in <span className="text-[var(--accent-primary)] font-semibold">Pure Rust</span> (creator of <strong className="text-[var(--text-primary)]">gladeshell</strong>, a sub-millisecond terminal with 0.0114 ms latency). This deep understanding of memory and runtime efficiency ensures every web application I ship is exceptionally fast, secure, and production-ready.
						</p>
					</div>
				</div>

				{/* 3 Summary Cards (Elevated) */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full mt-4">
					{/* Experience Card */}
					<div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-7 text-center shadow-sm hover:shadow-lg transition-all duration-300 group">
						<div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
							<BriefcaseIcon className="w-6 h-6" />
						</div>
						<h3 className="font-bold text-lg sm:text-xl mb-1 text-[var(--text-primary)]">
							Experience
						</h3>
						<p className="text-[var(--text-muted)] text-sm">
							3+ Years <br />
							Full-Stack Web Dev
						</p>
					</div>

					{/* Education Card */}
					<div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-7 text-center shadow-sm hover:shadow-lg transition-all duration-300 group">
						<div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
							<AcademicCapIcon className="w-6 h-6" />
						</div>
						<h3 className="font-bold text-lg sm:text-xl mb-1 text-[var(--text-primary)]">
							Education & Focus
						</h3>
						<p className="text-[var(--text-muted)] text-sm">
							Modern Web Architecture <br />
							CS Principles & UI/UX
						</p>
					</div>

					{/* Engineering Edge Card */}
					<div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-7 text-center shadow-sm hover:shadow-lg transition-all duration-300 group">
						<div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-2xl select-none leading-none group-hover:scale-110 transition-transform">
							⚡
						</div>
						<h3 className="font-bold text-lg sm:text-xl mb-1 text-[var(--text-primary)]">
							Engineering Edge
						</h3>
						<p className="text-[var(--text-muted)] text-sm">
							Pure Rust Systems <br />
							Creator of gladeshell (0.0114ms)
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}