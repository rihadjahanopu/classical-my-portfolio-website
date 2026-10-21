"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTheme, AVAILABLE_THEMES, ThemeId } from "./ThemeProvider";
import { Magnetic } from "./MagneticButton";

interface CommandItem {
	id: string;
	title: string;
	category: "Navigation" | "Actions" | "Themes" | "Social" | "Articles";
	icon: string;
	action: () => void;
	shortcut?: string;
}

interface CommandPaletteProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
	const router = useRouter();
	const [search, setSearch] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(0);
	const { theme, setTheme, showToast, playClick, soundEnabled, toggleSound } = useTheme();

	// Close on Escape or open on Cmd+K / Ctrl+K
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				if (isOpen) {
					onClose();
				} else {
					playClick();
				}
			}
			if (e.key === "Escape" && isOpen) {
				onClose();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, onClose, playClick]);

	// Prevent background scroll and stop Lenis when command palette is open
	useEffect(() => {
		if (isOpen) {
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
			setSearch("");
			setSelectedIndex(0);
		}
		return () => {
			document.body.style.overflow = "";
			document.documentElement.style.overflow = "";
			if (typeof window !== "undefined") {
				(window as unknown as { __lenis?: { start: () => void } }).__lenis?.start();
			}
		};
	}, [isOpen]);

	const commands: CommandItem[] = useMemo(() => {
		const jumpTo = (id: string) => {
			onClose();
			playClick();
			const el = document.getElementById(id);
			if (el) el.scrollIntoView({ behavior: "smooth" });
		};

		const copyToClipboard = async (text: string, msg: string) => {
			try {
				await navigator.clipboard.writeText(text);
				showToast(msg);
			} catch {}
			onClose();
			playClick();
		};

		const items: CommandItem[] = [
			// Navigation
			{ id: "nav-home", title: "Go to Home", category: "Navigation", icon: "🏠", action: () => jumpTo("profile") },
			{ id: "nav-about", title: "Go to About Me", category: "Navigation", icon: "👤", action: () => jumpTo("about") },
			{ id: "nav-exp", title: "Go to Experience & Skills", category: "Navigation", icon: "🛠️", action: () => jumpTo("experience") },
			{ id: "nav-proj", title: "Go to Projects", category: "Navigation", icon: "🚀", action: () => jumpTo("projects") },
			{ id: "nav-blog", title: "Go to Engineering Blog", category: "Navigation", icon: "📝", action: () => jumpTo("blog") },
			{ id: "nav-contact", title: "Go to Contact", category: "Navigation", icon: "📬", action: () => jumpTo("contact") },

			// Featured Article
			{
				id: "art-gladeshell",
				title: "Read Article: Engineering gladeshell (0.0114ms Pure Rust)",
				category: "Articles",
				icon: "🦀",
				action: () => {
					router.push("/blog/engineering-gladeshell-0-0114ms-latency-rust-terminal");
					onClose();
					playClick();
				},
			},

			// Actions
			{
				id: "act-copy-email",
				title: "Copy Email (rihad@rihadjahanopu.com)",
				category: "Actions",
				icon: "📧",
				action: () => copyToClipboard("rihad@rihadjahanopu.com", "Copied rihad@rihadjahanopu.com to clipboard!"),
			},
			{
				id: "act-copy-md",
				title: "Copy Profile Markdown (llms.txt)",
				category: "Actions",
				icon: "📋",
				action: async () => {
					try {
						const res = await fetch("/llms.txt");
						const text = await res.text();
						await navigator.clipboard.writeText(text);
						showToast("Copied full profile markdown to clipboard!");
					} catch {
						await navigator.clipboard.writeText("https://www.rihadjahanopu.com/llms.txt");
						showToast("Copied profile URL to clipboard!");
					}
					onClose();
					playClick();
				},
			},
			{
				id: "act-download-cv",
				title: "Download Resume / CV",
				category: "Actions",
				icon: "📄",
				action: () => {
					window.open("/assets/Rihad Jahan Opu.pdf");
					onClose();
					playClick();
				},
			},
			{
				id: "act-toggle-sound",
				title: soundEnabled ? "Disable Click Audio" : "Enable Click Audio",
				category: "Actions",
				icon: soundEnabled ? "🔊" : "🔇",
				action: () => {
					toggleSound();
					showToast(soundEnabled ? "Audio effects disabled" : "Audio effects enabled!");
					onClose();
				},
			},

			// Themes
			...AVAILABLE_THEMES.map((t) => ({
				id: `theme-${t.id}`,
				title: `Switch Theme to ${t.name}`,
				category: "Themes" as const,
				icon: "🎨",
				action: () => {
					setTheme(t.id as ThemeId);
					showToast(`Theme changed to ${t.name}`);
					onClose();
					playClick();
				},
			})),

			// Social
			{
				id: "soc-github",
				title: "Open GitHub Profile",
				category: "Social",
				icon: "🐙",
				action: () => {
					window.open("https://github.com/rihadjahanopu", "_blank");
					onClose();
				},
			},
			{
				id: "soc-gladeshell",
				title: "Open gladeshell Repository",
				category: "Social",
				icon: "🦀",
				action: () => {
					window.open("https://github.com/rihadjahanopu/gladeshell", "_blank");
					onClose();
				},
			},
			{
				id: "soc-linkedin",
				title: "Open LinkedIn Profile",
				category: "Social",
				icon: "💼",
				action: () => {
					window.open("https://www.linkedin.com/in/rihadjahanopu", "_blank");
					onClose();
				},
			},
		];

		return items;
	}, [onClose, playClick, showToast, soundEnabled, toggleSound, setTheme]);

	const filtered = useMemo(() => {
		if (!search.trim()) return commands;
		const query = search.toLowerCase();
		return commands.filter(
			(cmd) =>
				cmd.title.toLowerCase().includes(query) ||
				cmd.category.toLowerCase().includes(query)
		);
	}, [commands, search]);

	// Keyboard arrow navigation
	useEffect(() => {
		if (!isOpen) return;

		const handleArrows = (e: KeyboardEvent) => {
			if (e.key === "ArrowDown") {
				e.preventDefault();
				setSelectedIndex((prev) => (prev + 1) % filtered.length);
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
			} else if (e.key === "Enter" && filtered[selectedIndex]) {
				e.preventDefault();
				filtered[selectedIndex].action();
			}
		};

		window.addEventListener("keydown", handleArrows);
		return () => window.removeEventListener("keydown", handleArrows);
	}, [isOpen, filtered, selectedIndex]);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-md flex justify-center items-start pt-16 sm:pt-28 p-3 sm:p-4 animate-in fade-in duration-200 overscroll-contain"
			data-lenis-prevent="true"
			onClick={onClose}>
			<div
				className="w-full max-w-xl bg-[var(--bg-card)] text-[var(--text-primary)] rounded-3xl border border-[var(--border-color)] shadow-2xl overflow-hidden flex flex-col max-h-[75vh] overscroll-contain"
				data-lenis-prevent="true"
				onClick={(e) => e.stopPropagation()}>
				{/* Search Input Bar */}
				<div className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-200 dark:border-white/10">
					<span className="text-gray-400 text-lg">🔍</span>
					<input
						type="text"
						autoFocus
						placeholder="Type a command or search..."
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
							setSelectedIndex(0);
						}}
						className="w-full bg-transparent outline-none text-black dark:text-white placeholder-gray-400 text-sm sm:text-base font-medium"
					/>
					<Magnetic strength={0.3}>
						<button
							onClick={onClose}
							className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-500 text-xs font-mono cursor-pointer">
							ESC
						</button>
					</Magnetic>
				</div>

				{/* Results List */}
				<div
					className="overflow-y-auto p-2 space-y-1 [scrollbar-width:none] overscroll-contain"
					data-lenis-prevent="true">
					{filtered.length === 0 ? (
						<div className="p-8 text-center text-sm text-gray-400">
							No matching commands found.
						</div>
					) : (
						filtered.map((cmd, idx) => {
							const isSelected = idx === selectedIndex;
							return (
								<div
									key={cmd.id}
									onClick={() => cmd.action()}
									onMouseEnter={() => setSelectedIndex(idx)}
									className={`flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl cursor-pointer text-sm transition-all duration-150 gap-2 ${
										isSelected
											? "bg-blue-600/10 text-blue-600 dark:bg-white/10 dark:text-white font-medium pl-4 sm:pl-5"
											: "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
									}`}>
									<div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
										<span className="text-base shrink-0">{cmd.icon}</span>
										<span className="truncate text-xs sm:text-sm">{cmd.title}</span>
									</div>
									<span className="text-[10px] sm:text-[11px] font-mono uppercase px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-400 shrink-0">
										{cmd.category}
									</span>
								</div>
							);
						})
					)}
				</div>

				{/* Footer Hint */}
				<div className="px-4 sm:px-5 py-2.5 sm:py-3 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02] flex items-center justify-between text-[10px] sm:text-[11px] text-gray-400 font-mono">
					<span className="hidden sm:inline">Use ↑ ↓ to navigate, ↵ to select</span>
					<span className="sm:hidden">Tap any command to run</span>
					<span className="hidden sm:inline">⌘K to toggle</span>
					<button
						onClick={onClose}
						className="sm:hidden text-xs text-gray-400 hover:text-white cursor-pointer">
						Close ✕
					</button>
				</div>
			</div>
		</div>
	);
}

