"use client";

import { memo, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useTheme, AVAILABLE_THEMES, ThemeId } from "./ThemeProvider";
import CommandPalette from "./CommandPalette";
import { Magnetic } from "./MagneticButton";
import { SearchIcon, VolumeIcon, VolumeMuteIcon } from "./Icons";

interface NavbarProps {
	menuOpen: boolean;
	toggleMenu: () => void;
}

const NAV_ITEMS = [
	{
		id: "profile",
		name: "Home",
		num: "01",
		desc: "Introduction & Terminal",
		icon: "🏠",
	},
	{
		id: "about",
		name: "About",
		num: "02",
		desc: "Engineering & Story",
		icon: "👤",
	},
	{
		id: "experience",
		name: "Experience",
		num: "03",
		desc: "Rust Systems & Telemetry",
		icon: "⚡",
	},
	{
		id: "projects",
		name: "Projects",
		num: "04",
		desc: "gladeshell & Web Apps",
		icon: "🚀",
	},
	{
		id: "blog",
		name: "Blog",
		num: "05",
		desc: "gladeshell & Systems Posts",
		icon: "📝",
	},
	{
		id: "contact",
		name: "Contact",
		num: "06",
		desc: "Availability & Connect",
		icon: "📬",
	},
];

const mobileMenuVariants: Variants = {
	closed: {
		opacity: 0,
		scale: 0.95,
		y: -12,
		transition: {
			duration: 0.2,
			ease: "easeInOut",
		},
	},
	open: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: {
			type: "spring",
			stiffness: 360,
			damping: 26,
			staggerChildren: 0.045,
			delayChildren: 0.05,
		},
	},
};

const mobileItemVariants: Variants = {
	closed: { opacity: 0, x: -14, filter: "blur(4px)" },
	open: {
		opacity: 1,
		x: 0,
		filter: "blur(0px)",
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 24,
		},
	},
};

const Navbar = memo(function Navbar({ menuOpen, toggleMenu }: NavbarProps) {
	const { theme, setTheme, soundEnabled, toggleSound, playClick } = useTheme();
	const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
	const [cmdOpen, setCmdOpen] = useState(false);
	const [isMac, setIsMac] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent || ""));
		}
	}, []);

	const currentThemeObj = AVAILABLE_THEMES.find((t) => t.id === theme) || AVAILABLE_THEMES[0];

	return (
		<>
			<CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />

			<header className="fixed top-3 sm:top-4 left-0 right-0 w-full z-[1000] px-4">
				<div className="max-w-6xl mx-auto bg-[var(--bg-card)]/85 backdrop-blur-xl border border-[var(--border-color)] rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300">
					{/* Desktop Navigation */}
					<nav
						id="desktop-nav"
						className="hidden lg:flex justify-between items-center">
						<div className="text-xl cursor-default">
							<a
								href="#profile"
								className="transition-transform duration-300 hover:scale-105 block">
								<Image
									src="/assets/daynamikrihad.svg"
									alt="logo"
									width={96}
									height={40}
									className="logo-in dark:invert"
									style={{ width: "6rem", height: "auto" }}
									unoptimized
									priority
								/>
							</a>
						</div>

						{/* Modern Floating Capsule Nav Links */}
						<ul className="flex items-center gap-1 list-none p-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md">
							{NAV_ITEMS.map((item) => (
								<li key={item.id}>
									<Magnetic strength={0.2}>
										<a
											href={`#${item.id}`}
											onClick={playClick}
											className="group relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200">
											<span>{item.name}</span>
											<span className="w-1 h-1 rounded-full bg-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
										</a>
									</Magnetic>
								</li>
							))}
						</ul>

						{/* Controls: Command Palette, Theme Selector, Sound Toggle */}
						<div className="flex items-center gap-2.5">
							{/* Command Palette Button */}
							<Magnetic strength={0.25}>
								<button
									onClick={() => {
										playClick();
										setCmdOpen(true);
									}}
									className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 bg-gray-100/80 dark:bg-white/5 hover:bg-gray-200/90 dark:hover:bg-white/10 text-xs font-mono text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer shadow-2xs">
									<SearchIcon className="w-3.5 h-3.5 text-gray-400 group-hover:text-[var(--accent-primary)] transition-colors" />
									<span className="hidden xl:inline text-xs font-sans font-medium">Search</span>
									<kbd className="inline-flex items-center gap-0.5 text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-md bg-white dark:bg-white/10 border border-gray-200 dark:border-white/15 text-gray-600 dark:text-gray-300 group-hover:border-[var(--accent-primary)]/40 transition-colors shadow-2xs">
										<span>{isMac ? "⌘" : "Ctrl"}</span>
										<span>K</span>
									</kbd>
								</button>
							</Magnetic>

							{/* Theme Selector Dropdown */}
							<div className="relative">
								<Magnetic strength={0.25}>
									<button
										onClick={() => {
											playClick();
											setThemeDropdownOpen((prev) => !prev);
										}}
										className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 bg-gray-100/80 dark:bg-white/5 hover:bg-gray-200/90 dark:hover:bg-white/10 text-xs text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer shadow-2xs">
										<span
											className="w-2.5 h-2.5 rounded-full ring-2 ring-black/10 dark:ring-white/20 shadow-xs shrink-0"
											style={{ backgroundColor: currentThemeObj.color }}
										/>
										<span className="max-w-[85px] truncate font-sans font-medium">{currentThemeObj.name}</span>
										<svg
											className={`w-3 h-3 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-transform duration-200 ${
												themeDropdownOpen ? "rotate-180" : ""
											}`}
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth={2.5}
											strokeLinecap="round"
											strokeLinejoin="round">
											<polyline points="6 9 12 15 18 9" />
										</svg>
									</button>
								</Magnetic>

								{themeDropdownOpen && (
									<div
										className="absolute right-0 top-full mt-2 w-48 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
										onClick={() => setThemeDropdownOpen(false)}>
										<div className="text-[10px] font-mono uppercase tracking-wider text-gray-400 px-3 py-1">
											Select Theme
										</div>
										{AVAILABLE_THEMES.map((t) => (
											<button
												key={t.id}
												onClick={() => {
													setTheme(t.id as ThemeId);
													playClick();
												}}
												className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
													theme === t.id
														? "bg-blue-600/10 text-blue-600 dark:bg-white/10 dark:text-white"
														: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
												}`}>
												<span
													className="w-2.5 h-2.5 rounded-full flex-shrink-0"
													style={{ backgroundColor: t.color }}
												/>
												<span className="truncate">{t.name}</span>
											</button>
										))}
									</div>
								)}
							</div>

							{/* Sound Toggle Button */}
							<Magnetic strength={0.3}>
								<button
									onClick={() => {
										toggleSound();
										playClick();
									}}
									title={soundEnabled ? "Mute audio" : "Enable tactile audio"}
									className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 bg-gray-100/80 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center text-xs text-gray-700 dark:text-gray-300 transition-all cursor-pointer">
									{soundEnabled ? (
										<VolumeIcon className="w-3.5 h-3.5 text-emerald-500" />
									) : (
										<VolumeMuteIcon className="w-3.5 h-3.5 text-gray-400" />
									)}
								</button>
							</Magnetic>
						</div>
					</nav>

					{/* Mobile Navigation Bar */}
					<nav
						id="hamburger-nav"
						className="flex lg:hidden justify-between items-center relative">
						<div className="text-xl">
							<a href="#profile" onClick={playClick}>
								<Image
									src="/assets/daynamikrihad.svg"
									alt="logo"
									width={80}
									height={32}
									className="logo-in dark:invert"
									style={{ width: "4.75rem", height: "auto" }}
									unoptimized
								/>
							</a>
						</div>

						{/* Mobile Right Controls: Search, Theme, Sound & Hamburger */}
						<div className="flex items-center gap-1.5 sm:gap-2">
							{/* Mobile Search Button */}
							<Magnetic strength={0.25}>
								<button
									onClick={() => {
										playClick();
										setCmdOpen(true);
									}}
									aria-label="Search"
									title="Search commands and sections"
									className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-all cursor-pointer shrink-0">
									<SearchIcon className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
								</button>
							</Magnetic>

							{/* Mobile Theme Cycle Button */}
							<Magnetic strength={0.25}>
								<button
									onClick={() => {
										const currentIndex = AVAILABLE_THEMES.findIndex((t) => t.id === theme);
										const nextTheme = AVAILABLE_THEMES[(currentIndex + 1) % AVAILABLE_THEMES.length].id;
										setTheme(nextTheme);
										playClick();
									}}
									className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center shrink-0 cursor-pointer"
									title={`Current: ${currentThemeObj.name}. Tap to cycle.`}>
									<span
										className="w-3 h-3 rounded-full"
										style={{ backgroundColor: currentThemeObj.color }}
									/>
								</button>
							</Magnetic>

							{/* Mobile Sound Toggle Button */}
							<Magnetic strength={0.25}>
								<button
									onClick={() => {
										toggleSound();
										playClick();
									}}
									className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-[11px] shrink-0 cursor-pointer"
									title={soundEnabled ? "Mute audio" : "Enable tactile audio"}>
									{soundEnabled ? (
										<VolumeIcon className="w-3 h-3 text-emerald-500" />
									) : (
										<VolumeMuteIcon className="w-3 h-3 text-gray-400" />
									)}
								</button>
							</Magnetic>

							{/* Hamburger Toggle */}
							<Magnetic strength={0.25}>
								<button
									aria-label="Toggle navigation menu"
									className="flex flex-col justify-between h-5 w-6 cursor-pointer z-50 ml-0.5 sm:ml-1 shrink-0 bg-transparent border-none p-0"
									onClick={() => {
										playClick();
										toggleMenu();
									}}>
									<span
										className={`w-full h-0.5 bg-black dark:bg-white rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[9px]" : ""}`}
									/>
									<span
										className={`w-full h-0.5 bg-black dark:bg-white rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
									/>
									<span
										className={`w-full h-0.5 bg-black dark:bg-white rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[9px]" : ""}`}
									/>
								</button>
							</Magnetic>
						</div>

						{/* Mobile Menu Backdrop with Blur */}
						<AnimatePresence>
							{menuOpen && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.2 }}
									className="fixed inset-0 -top-20 z-[-1] bg-black/60 backdrop-blur-sm lg:hidden"
									onClick={toggleMenu}
								/>
							)}
						</AnimatePresence>

						{/* Fancy Modern Mobile Dropdown Menu with Spring Animation */}
						<AnimatePresence>
							{menuOpen && (
								<motion.div
									initial="closed"
									animate="open"
									exit="closed"
									variants={mobileMenuVariants}
									className="absolute top-[135%] left-0 right-0 bg-[var(--bg-card)]/95 backdrop-blur-2xl border border-[var(--border-color)] shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-3xl p-3.5 sm:p-4 flex flex-col gap-2 max-h-[82vh] overflow-y-auto [scrollbar-width:none]">
									
									{/* Nav Links List */}
									<div className="flex flex-col gap-1.5 w-full">
										{NAV_ITEMS.map((item) => (
											<motion.a
												key={item.id}
												href={`#${item.id}`}
												variants={mobileItemVariants}
												onClick={() => {
													playClick();
													toggleMenu();
												}}
												className="group w-full flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-transparent hover:border-[var(--accent-primary)]/30 transition-all duration-200 active:scale-[0.98]">
												<div className="flex items-center gap-3">
													<span className="w-9 h-9 rounded-xl bg-white dark:bg-white/10 shadow-2xs border border-black/5 dark:border-white/10 flex items-center justify-center text-base shrink-0 group-hover:scale-110 transition-transform">
														{item.icon}
													</span>
													<div className="text-left">
														<div className="flex items-center gap-2">
															<span className="text-[11px] font-mono text-[var(--accent-primary)] font-bold">
																{item.num}
															</span>
															<span className="text-sm sm:text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
																{item.name}
															</span>
														</div>
														<p className="text-[10px] sm:text-[11px] text-[var(--text-muted)] font-mono leading-tight">
															{item.desc}
														</p>
													</div>
												</div>
												<div className="flex items-center text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] group-hover:translate-x-1 transition-all pr-1">
													<span className="text-xs font-mono font-bold">→</span>
												</div>
											</motion.a>
										))}
									</div>

									{/* Mobile Theme Switcher Section */}
									<motion.div
										variants={mobileItemVariants}
										className="w-full pt-3 mt-1 border-t border-[var(--border-color)]">
										<div className="flex items-center justify-between mb-2.5 px-1">
											<span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold flex items-center gap-1.5">
												<span>🎨</span>
												<span>Theme Palette</span>
											</span>
											<span className="text-[10px] font-mono text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-2 py-0.5 rounded-full border border-[var(--accent-primary)]/20 font-semibold">
												{currentThemeObj.name}
											</span>
										</div>
										<div className="grid grid-cols-2 gap-1.5">
											{AVAILABLE_THEMES.map((t) => {
												const isCurrent = theme === t.id;
												return (
													<button
														key={t.id}
														onClick={() => {
															setTheme(t.id as ThemeId);
															playClick();
														}}
														className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer border ${
															isCurrent
																? "bg-[var(--accent-primary)]/15 border-[var(--accent-primary)] text-[var(--text-primary)] font-bold shadow-xs"
																: "bg-black/5 dark:bg-white/5 border-transparent text-[var(--text-secondary)] hover:bg-black/10 dark:hover:bg-white/10"
														}`}>
														<span
															className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs ring-1 ring-black/20"
															style={{ backgroundColor: t.color }}
														/>
														<span className="text-[11px] font-mono truncate">{t.name}</span>
													</button>
												);
											})}
										</div>
									</motion.div>

									{/* Quick Action Footer Pills */}
									<motion.div
										variants={mobileItemVariants}
										className="w-full grid grid-cols-2 gap-2 pt-2 border-t border-[var(--border-color)]">
										<button
											onClick={() => {
												playClick();
												toggleMenu();
												setCmdOpen(true);
											}}
											className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-black/5 dark:bg-white/5 text-[11px] font-mono text-[var(--text-secondary)] hover:bg-black/10 dark:hover:bg-white/10 transition-all cursor-pointer">
											<SearchIcon className="w-3 h-3 text-[var(--accent-primary)]" />
											<span>Search (⌘K)</span>
										</button>
										<a
											href="/assets/Rihad Jahan Opu.pdf"
											target="_blank"
											rel="noopener noreferrer"
											onClick={() => {
												playClick();
												toggleMenu();
											}}
											className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-black/5 dark:bg-white/5 text-[11px] font-mono text-[var(--text-secondary)] hover:bg-black/10 dark:hover:bg-white/10 transition-all cursor-pointer">
											<span>📄</span>
											<span>Download CV</span>
										</a>
									</motion.div>
								</motion.div>
							)}
						</AnimatePresence>
					</nav>
				</div>
			</header>
		</>
	);
});

export default Navbar;
