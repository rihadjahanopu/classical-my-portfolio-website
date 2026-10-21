"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TimezoneBadge from "./TimezoneBadge";
import TextScramble from "./TextScramble";
import MagneticButton, { Magnetic } from "./MagneticButton";
import GladeshellTerminal from "./GladeshellTerminal";
import { useTheme } from "./ThemeProvider";
import {
	CopyIcon,
	ChatGPTIcon,
	BotIcon,
	LinkedinIcon,
	GithubIcon,
	GooglePlayIcon,
	MailIcon,
} from "./Icons";

const ROLES = [
	"⚡ Full-Stack Web Developer",
	"🌐 Next.js & React Architect",
	"🚀 Scalable Cloud & API Engineer",
	"🦀 Pure Rust Systems Builder",
];

export default function Hero() {
	const [roleIndex, setRoleIndex] = useState(0);
	const { showToast, playClick } = useTheme();

	// Animated role switcher
	useEffect(() => {
		const interval = setInterval(() => {
			setRoleIndex((prev) => (prev + 1) % ROLES.length);
		}, 3200);
		return () => clearInterval(interval);
	}, []);

	const copyProfileMarkdown = async () => {
		try {
			const res = await fetch("/llms.txt");
			const text = await res.text();
			await navigator.clipboard.writeText(text);
			showToast("Copied profile markdown (.md) to clipboard!");
		} catch {
			await navigator.clipboard.writeText("https://www.rihadjahanopu.com/llms.txt");
			showToast("Copied profile URL to clipboard!");
		}
	};

	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText("rihad@rihadjahanopu.com");
			showToast("Copied rihad@rihadjahanopu.com to clipboard!");
		} catch {}
	};

	const btnClass =
		"font-semibold transition-all duration-300 px-6 py-3 rounded-full border border-black dark:border-white/20 flex justify-center items-center cursor-pointer text-sm shadow-md w-full sm:w-auto text-center";

	return (
		<section
			id="profile"
			className="hero-wrapper flex flex-col justify-center items-center min-h-[90vh] sm:min-h-screen pt-24 sm:pt-28 pb-12 sm:pb-16 scroll-mt-32 w-full">
			{/* Top Live Timezone & Status Badge */}
			<div className="mb-6 sm:mb-8 animate-in fade-in slide-in-from-top-4 duration-500 w-full flex justify-center">
				<TimezoneBadge />
			</div>

			{/* Main Hero Container: Avatar + Text */}
			<div className="flex flex-col lg:flex-row justify-center items-center gap-8 sm:gap-10 lg:gap-16 w-full max-w-5xl">
				{/* Avatar Picture Container */}
				<div className="w-44 h-44 sm:w-60 sm:h-60 lg:w-80 lg:h-80 relative flex-shrink-0 section__pic-container">
					{/* Glowing Ambient Ring */}
					<div
						className="absolute inset-0 rounded-full blur-2xl opacity-40 -z-10 animate-pulse"
						style={{ background: "var(--accent-glow)" }}
					/>
					<div className="w-full h-full relative rounded-full p-1.5 border-2 border-gray-200 dark:border-white/20 bg-white/40 dark:bg-white/5 backdrop-blur-md shadow-2xl profile-in-co">
						<Image
							src="/assets/rihadprofile.jpg"
							alt="Rihad Jahan Opu"
							fill
							priority
							className="object-cover rounded-full"
							sizes="(max-width: 640px) 176px, (max-width: 1024px) 240px, 320px"
						/>
					</div>
				</div>

				{/* Text Details Container */}
				<div className="text-center lg:text-left flex flex-col items-center lg:items-start max-w-xl w-full px-2 sm:px-0">
					<p className="text-[var(--text-muted)] font-semibold text-sm sm:text-lg mb-1 hero-p1 font-mono">
						Hello, I&apos;m
					</p>

					{/* Name with Hacker Scramble Effect */}
					<h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight hero-title mb-2 break-words">
						<TextScramble text="Rihad Jahan Opu" />
					</h1>

					{/* Dynamic Role Switcher */}
					<div className="h-7 sm:h-8 flex items-center mb-4 sm:mb-6">
						<p className="text-base sm:text-xl font-semibold text-[var(--accent-primary)] font-mono transition-all duration-300">
							{ROLES[roleIndex]}
						</p>
					</div>

					<p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-lg">
						Building modern, high-performance web applications with <span className="text-[var(--text-primary)] font-bold">Next.js, React & TypeScript</span>. Focused on scalable full-stack platforms, 100/100 Lighthouse performance, and backed by a systems engineering edge in <span className="text-[var(--text-primary)] font-bold">Pure Rust</span> (creator of gladeshell, 0.0114ms).
					</p>

					{/* Primary Action Buttons (Magnetic) */}
					<div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 hero-btns w-full max-w-xs sm:max-w-none">
						<MagneticButton
							className={`${btnClass} bg-transparent text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black`}
							onClick={() => window.open("/assets/Rihad Jahan Opu.pdf")}>
							Download CV 📄
						</MagneticButton>

						<MagneticButton
							className={`${btnClass} bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 border-transparent`}
							onClick={() => {
								const el = document.getElementById("contact");
								if (el) el.scrollIntoView({ behavior: "smooth" });
							}}>
							Contact Info 📬
						</MagneticButton>
					</div>

					{/* AI-Native Action Pills (Modern Standard) */}
					<div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 pt-3 border-t border-gray-200/80 dark:border-white/10 w-full">
						<Magnetic strength={0.25}>
							<button
								onClick={copyProfileMarkdown}
								className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-[11px] sm:text-xs font-mono text-[var(--text-secondary)] transition-all cursor-pointer shadow-2xs">
								<CopyIcon className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
								<span>Copy Profile (.md)</span>
							</button>
						</Magnetic>

						<Magnetic strength={0.25}>
							<a
								href="https://chatgpt.com/?q=Tell+me+about+Rihad+Jahan+Opu,+creator+of+gladeshell+and+full-stack+engineer"
								target="_blank"
								rel="noopener noreferrer"
								onClick={playClick}
								className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-[11px] sm:text-xs font-mono text-[var(--text-secondary)] transition-all cursor-pointer shadow-2xs">
								<ChatGPTIcon className="w-3.5 h-3.5 text-emerald-500" />
								<span>Ask in ChatGPT</span>
							</a>
						</Magnetic>

						<Magnetic strength={0.25}>
							<a
								href="https://claude.ai/new?q=Review+Rihad+Jahan+Opu,+full-stack+developer+and+creator+of+gladeshell"
								target="_blank"
								rel="noopener noreferrer"
								onClick={playClick}
								className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-[11px] sm:text-xs font-mono text-[var(--text-secondary)] transition-all cursor-pointer shadow-2xs">
								<BotIcon className="w-3.5 h-3.5 text-amber-500" />
								<span>Ask in Claude</span>
							</a>
						</Magnetic>
					</div>

					{/* Social Icons & Email Quick Pill */}
					<div
						id="socials-container"
						className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 mt-5 sm:mt-6 w-full">
						<Magnetic strength={0.3}>
							<a
								href="https://www.linkedin.com/in/rihadjahanopu"
								target="_blank"
								rel="noopener noreferrer"
								onClick={playClick}
								title="LinkedIn Profile"
								className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/10 hover:scale-110 transition-transform block text-[#0a66c2] dark:text-[#38bdf8]">
								<LinkedinIcon className="w-5 h-5" />
							</a>
						</Magnetic>

						<Magnetic strength={0.3}>
							<a
								href="https://github.com/rihadjahanopu"
								target="_blank"
								rel="noopener noreferrer"
								onClick={playClick}
								title="GitHub Profile"
								className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/10 hover:scale-110 transition-transform block text-gray-900 dark:text-white">
								<GithubIcon className="w-5 h-5" />
							</a>
						</Magnetic>

						<Magnetic strength={0.3}>
							<a
								href="/apk/Rihad.apk"
								download="Rihad.apk"
								onClick={playClick}
								className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/10 hover:scale-110 transition-transform block text-emerald-500"
								title="Download Android APK">
								<GooglePlayIcon className="w-5 h-5" />
							</a>
						</Magnetic>

						<Magnetic strength={0.25}>
							<button
								onClick={copyEmail}
								className="text-[11px] sm:text-xs font-mono text-[var(--text-secondary)] px-3 py-2 rounded-full border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer max-w-full truncate inline-flex items-center gap-1.5">
								<MailIcon className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
								<span>rihad@rihadjahanopu.com</span>
							</button>
						</Magnetic>
					</div>
				</div>
			</div>

			{/* Interactive gladeshell Terminal Showcase */}
			<div className="w-full mt-10 sm:mt-16 animate-in fade-in duration-700">
				<GladeshellTerminal />
			</div>
		</section>
	);
}
