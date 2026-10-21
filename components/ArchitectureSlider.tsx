"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTheme } from "./ThemeProvider";
import { Magnetic } from "./MagneticButton";

export default function ArchitectureSlider() {
	const [sliderPos, setSliderPos] = useState(50);
	const [isDragging, setIsDragging] = useState(false);
	const [mobileTab, setMobileTab] = useState<"rust" | "legacy" | "compare">("rust");
	const containerRef = useRef<HTMLDivElement>(null);
	const { playClick } = useTheme();

	const handleMove = useCallback((clientX: number) => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		const x = clientX - rect.left;
		const percentage = Math.max(15, Math.min(85, (x / rect.width) * 100));
		setSliderPos(percentage);
	}, []);

	useEffect(() => {
		const onPointerMove = (e: PointerEvent) => {
			if (!isDragging) return;
			handleMove(e.clientX);
		};

		const onPointerUp = () => {
			setIsDragging(false);
		};

		if (isDragging) {
			window.addEventListener("pointermove", onPointerMove);
			window.addEventListener("pointerup", onPointerUp);
		}

		return () => {
			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("pointerup", onPointerUp);
		};
	}, [isDragging, handleMove]);

	const METRICS = [
		{
			title: "Core Latency",
			rustVal: "0.0114 ms",
			rustNote: "⚡ ~210x Faster",
			legacyVal: "18.50 ms",
			legacyNote: "Perceptible lag on Enter",
		},
		{
			title: "Subshell Forks",
			rustVal: "0 forks",
			rustNote: "🚀 Zero process spawn",
			legacyVal: "3 - 8 forks",
			legacyNote: "Spawns git every prompt",
		},
		{
			title: "RAM Footprint",
			rustVal: "~3.9 MB",
			rustNote: "🦀 Fat-LTO stripped",
			legacyVal: "28 - 55 MB",
			legacyNote: "High memory per tab",
		},
		{
			title: "Git Telemetry",
			rustVal: "4.8 µs",
			rustNote: "🌿 Pure Rust gix 0.88",
			legacyVal: "45 - 250 ms",
			legacyNote: "Slow on monorepos",
		},
	];

	return (
		<div className="w-full max-w-5xl mx-auto my-12 text-left px-2 sm:px-0">
			{/* Section Header */}
			<div className="text-center mb-6">
				<p className="text-[11px] sm:text-xs uppercase tracking-wider text-[var(--accent-primary)] font-bold font-mono">
					Interactive Architecture Comparison
				</p>
				<h3 className="text-xl sm:text-3xl font-bold text-[var(--text-primary)] mt-1">
					Traditional Shell vs gladeshell Architecture
				</h3>
				<p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 max-w-lg mx-auto">
					Compare legacy script overhead with Pure Rust compiled binary performance.
				</p>

				{/* Quick Controls: Mobile Tabs & Desktop Presets */}
				<div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4">
					{/* Mobile Mode Toggles */}
					<div className="flex md:hidden items-center p-1 rounded-2xl bg-white/5 border border-[var(--border-color)] w-full max-w-sm">
						<button
							onClick={() => {
								playClick();
								setMobileTab("rust");
							}}
							className={`flex-1 text-center py-1.5 px-1.5 sm:px-3 rounded-xl text-[11px] sm:text-xs font-mono font-medium transition-all cursor-pointer ${
								mobileTab === "rust"
									? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
									: "text-[var(--text-muted)]"
							}`}>
							⚡ gladeshell
						</button>
						<button
							onClick={() => {
								playClick();
								setMobileTab("compare");
							}}
							className={`flex-1 text-center py-1.5 px-1.5 sm:px-3 rounded-xl text-[11px] sm:text-xs font-mono font-medium transition-all cursor-pointer ${
								mobileTab === "compare"
									? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
									: "text-[var(--text-muted)]"
							}`}>
							Side-by-Side
						</button>
						<button
							onClick={() => {
								playClick();
								setMobileTab("legacy");
							}}
							className={`flex-1 text-center py-1.5 px-1.5 sm:px-3 rounded-xl text-[11px] sm:text-xs font-mono font-medium transition-all cursor-pointer ${
								mobileTab === "legacy"
									? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
									: "text-[var(--text-muted)]"
							}`}>
							⚠️ Legacy
						</button>
					</div>

					{/* Desktop Presets */}
					<div className="hidden md:flex items-center gap-2">
						<Magnetic strength={0.25}>
							<button
								onClick={() => {
									playClick();
									setSliderPos(80);
								}}
								className={`px-3.5 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
									sliderPos > 65
										? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
										: "bg-white/5 text-[var(--text-muted)] hover:text-white border border-transparent"
								}`}>
								Legacy (Zsh Focus)
							</button>
						</Magnetic>

						<Magnetic strength={0.25}>
							<button
								onClick={() => {
									playClick();
									setSliderPos(50);
								}}
								className={`px-3.5 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
									sliderPos >= 45 && sliderPos <= 55
										? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
										: "bg-white/5 text-[var(--text-muted)] hover:text-white border border-transparent"
								}`}>
								50 / 50 Side-by-Side
							</button>
						</Magnetic>

						<Magnetic strength={0.25}>
							<button
								onClick={() => {
									playClick();
									setSliderPos(20);
								}}
								className={`px-3.5 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
									sliderPos < 35
										? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
										: "bg-white/5 text-[var(--text-muted)] hover:text-white border border-transparent"
								}`}>
								gladeshell (Pure Rust Focus)
							</button>
						</Magnetic>
					</div>
				</div>
			</div>

			{/* ========================================================= */}
			{/* MOBILE VIEW: Clean dedicated card based on selected tab   */}
			{/* ========================================================= */}
			<div className="block md:hidden">
				{mobileTab === "compare" ? (
					/* Direct Metric Comparison List */
					<div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xl space-y-3">
						<div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)] text-xs font-mono">
							<span className="text-rose-400 font-bold">Zsh + Starship</span>
							<span className="text-gray-500">VS</span>
							<span className="text-emerald-400 font-bold">gladeshell Rust</span>
						</div>
						{METRICS.map((m) => (
							<div
								key={m.title}
								className="p-3 rounded-xl bg-white/4 border border-[var(--border-color)] space-y-2">
								<span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] block text-center">
									{m.title}
								</span>
								<div className="grid grid-cols-2 gap-2 text-center font-mono">
									<div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
										<p className="text-base font-bold text-rose-400">{m.legacyVal}</p>
										<span className="text-[10px] text-rose-300 block">{m.legacyNote}</span>
									</div>
									<div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
										<p className="text-base font-bold text-emerald-400">{m.rustVal}</p>
										<span className="text-[10px] text-emerald-300 block">{m.rustNote}</span>
									</div>
								</div>
							</div>
						))}
					</div>
				) : mobileTab === "rust" ? (
					/* gladeshell Rust Card */
					<div className="p-4 sm:p-5 rounded-2xl bg-[#0a121c] text-white border border-emerald-500/30 shadow-xl space-y-4">
						<div className="flex flex-wrap items-center justify-between gap-2">
							<span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 whitespace-nowrap shrink-0">
								⚡ NEW ENGINE
							</span>
							<span className="text-[10px] font-mono text-emerald-400 whitespace-nowrap">
								Pure Rust 2024
							</span>
						</div>
						<div>
							<h4 className="text-xl font-bold text-white tracking-tight">
								gladeshell Pure Rust Engine
							</h4>
							<p className="text-xs text-gray-400 mt-0.5">
								Zero subshell forks • Compiled native binary • 100% Memory Safe
							</p>
						</div>
						<div className="grid grid-cols-1 gap-2 font-mono">
							{METRICS.map((m) => (
								<div
									key={m.title}
									className="p-3 rounded-xl bg-white/4 border border-emerald-500/20 flex items-center justify-between">
									<div>
										<span className="text-[10px] text-gray-400 uppercase tracking-wider block">
											{m.title}
										</span>
										<span className="text-[11px] text-emerald-300 font-medium">
											{m.rustNote}
										</span>
									</div>
									<p className="text-xl font-bold text-emerald-400">{m.rustVal}</p>
								</div>
							))}
						</div>
					</div>
				) : (
					/* Legacy Card */
					<div className="p-4 sm:p-5 rounded-2xl bg-[#140e17] text-white border border-rose-500/30 shadow-xl space-y-4">
						<div className="flex items-center justify-between">
							<span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-rose-500/20 text-rose-400 border border-rose-500/30">
								⚠️ LEGACY ARCHITECTURE
							</span>
							<span className="text-[10px] font-mono text-rose-300">
								Interpreted Scripts
							</span>
						</div>
						<div>
							<h4 className="text-xl font-bold text-white tracking-tight">
								Zsh + Oh My Zsh + Starship
							</h4>
							<p className="text-xs text-gray-400 mt-0.5">
								External forks per prompt • Heavy shell runtime overhead
							</p>
						</div>
						<div className="grid grid-cols-1 gap-2 font-mono">
							{METRICS.map((m) => (
								<div
									key={m.title}
									className="p-3 rounded-xl bg-white/4 border border-rose-500/20 flex items-center justify-between">
									<div>
										<span className="text-[10px] text-gray-400 uppercase tracking-wider block">
											{m.title}
										</span>
										<span className="text-[11px] text-rose-300 font-medium">
											{m.legacyNote}
										</span>
									</div>
									<p className="text-xl font-bold text-rose-400">{m.legacyVal}</p>
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			{/* ========================================================= */}
			{/* DESKTOP VIEW: Draggable Split Slider                      */}
			{/* ========================================================= */}
			<div
				ref={containerRef}
				className="hidden md:block relative w-full rounded-3xl overflow-hidden border border-[var(--border-color)] select-none shadow-2xl bg-[#07090e]"
				onPointerDown={(e) => {
					setIsDragging(true);
					handleMove(e.clientX);
				}}>
				<div className="flex flex-row w-full min-h-[460px]">
					{/* LEFT PANEL: Legacy Architecture */}
					<div
						className="relative flex flex-col justify-between p-6 sm:p-8 bg-[#140e17] text-gray-100 overflow-hidden border-r border-white/10 transition-[width] duration-75"
						style={{ width: `${sliderPos}%` }}>
						<div>
							<div className="flex items-center justify-between gap-2 mb-2">
								<span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
									⚠️ LEGACY
								</span>
								<span className="text-[11px] font-mono text-rose-300 truncate">
									Interpreted Scripts
								</span>
							</div>

							<h4 className="text-2xl font-bold text-white tracking-tight truncate">
								Zsh + Oh My Zsh
							</h4>
							<p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
								External forks per prompt • Shell runtime lag
							</p>

							{/* 4 Metric Cards */}
							<div className="grid grid-cols-2 gap-2.5 mt-5 font-mono">
								{METRICS.map((m) => (
									<div
										key={m.title}
										className="p-3 rounded-xl bg-white/4 border border-rose-500/20 shadow-xs">
										<span className="text-[10px] text-gray-400 uppercase tracking-wider block">
											{m.title}
										</span>
										<p className="text-2xl font-bold text-rose-400 mt-0.5">{m.legacyVal}</p>
										<span className="text-[10px] text-rose-300 block truncate">
											{m.legacyNote}
										</span>
									</div>
								))}
							</div>
						</div>

						<div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
							<span>Shell subprocess spawn</span>
							<span className="text-rose-400">Fork overhead</span>
						</div>
					</div>

					{/* RIGHT PANEL: Pure Rust gladeshell Engine */}
					<div
						className="relative flex flex-col justify-between p-6 sm:p-8 bg-[#0a121c] text-white overflow-hidden transition-[width] duration-75"
						style={{ width: `${100 - sliderPos}%` }}>
						<div>
							<div className="flex flex-wrap items-center justify-between gap-2 mb-2">
								<span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 whitespace-nowrap shrink-0">
									⚡ NEW ENGINE
								</span>
								<span className="text-[11px] font-mono text-emerald-400 whitespace-nowrap">
									Pure Rust 2024
								</span>
							</div>

							<h4 className="text-2xl font-bold text-white tracking-tight truncate">
								gladeshell Pure Rust
							</h4>
							<p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
								Zero subshell forks • Compiled native binary
							</p>

							{/* 4 Metric Cards */}
							<div className="grid grid-cols-2 gap-2.5 mt-5 font-mono">
								{METRICS.map((m) => (
									<div
										key={m.title}
										className="p-3 rounded-xl bg-white/4 border border-emerald-500/30 shadow-xs">
										<span className="text-[10px] text-gray-400 uppercase tracking-wider block">
											{m.title}
										</span>
										<p className="text-2xl font-bold text-emerald-400 mt-0.5">{m.rustVal}</p>
										<span className="text-[10px] text-emerald-300 block font-semibold truncate">
											{m.rustNote}
										</span>
									</div>
								))}
							</div>
						</div>

						<div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
							<span>Micro-benchmarked</span>
							<span className="text-emerald-400 font-medium">#![deny(unsafe_code)]</span>
						</div>
					</div>
				</div>

				{/* DRAGGABLE DIVIDER HANDLE */}
				<div
					className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.9)] z-20 pointer-events-none"
					style={{ left: `${sliderPos}%` }}>
					<div className="w-8 h-8 rounded-full bg-white text-gray-950 shadow-2xl flex items-center justify-center text-xs font-bold select-none -translate-x-1/2 border-2 border-gray-900 transition-transform hover:scale-110 active:scale-95 pointer-events-auto">
						↔
					</div>
				</div>
			</div>
		</div>
	);
}
