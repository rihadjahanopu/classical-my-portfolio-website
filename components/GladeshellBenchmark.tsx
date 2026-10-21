"use client";

import { motion } from "framer-motion";
import { Magnetic } from "./MagneticButton";

export default function GladeshellBenchmark() {
	const data = [
		{ name: "⚡ gladeshell (Pure Rust)", latency: "0.0114 ms", width: "100%", isWinner: true, note: "🏆 210x Faster" },
		{ name: "🚀 Starship (Modular Rust)", latency: "2.40 ms", width: "25%", isWinner: false, note: "Process exec overhead" },
		{ name: "🎨 Oh My Posh (Go Static)", latency: "8.20 ms", width: "15%", isWinner: false, note: "Garbage collection pauses" },
		{ name: "🐚 Oh My Zsh (Zsh Scripts)", latency: "18.50 ms", width: "6%", isWinner: false, note: "Multiple subshell forks" },
	];

	return (
		<div className="w-full max-w-4xl mx-auto my-8 p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xl text-left">
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 mb-6">
				<div>
					<span className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-emerald-500 font-mono">
						⚡ Empirical Performance Benchmark
					</span>
					<h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mt-0.5">
						Core Prompt Latency (PS1 Render Time)
					</h3>
				</div>
				<span className="text-[10px] sm:text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-[var(--border-color)] text-[var(--text-muted)] self-start sm:self-auto">
					Criterion Micro-benchmarks
				</span>
			</div>

			<div className="space-y-4">
				{data.map((item, idx) => (
					<div key={idx} className="space-y-1">
						{/* Label & Latency Number: flex-wrap safe for mobile */}
						<div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-medium gap-0.5 sm:gap-2">
							<span className={item.isWinner ? "font-bold text-emerald-500 flex items-center gap-1.5" : "text-[var(--text-muted)]"}>
								{item.isWinner && <span>⚡</span>}
								<span>{item.name}</span>
							</span>
							<span className="font-mono text-xs sm:text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
								<span>{item.latency}</span>
								<span className={`text-[10px] sm:text-xs font-normal ${item.isWinner ? "text-emerald-400 font-semibold" : "text-[var(--text-muted)]"}`}>
									({item.note})
								</span>
							</span>
						</div>

						{/* Animated Progress Bar Container */}
						<div className="h-3 sm:h-4 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-[var(--border-color)]">
							<motion.div
								initial={{ width: 0 }}
								whileInView={{ width: item.width }}
								viewport={{ once: true }}
								transition={{ duration: item.isWinner ? 0.35 : 1.2, ease: "easeOut" }}
								className={`h-full rounded-full ${
									item.isWinner
										? "bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-[0_0_12px_rgba(34,197,94,0.6)]"
										: "bg-gray-400/40 dark:bg-white/20"
								}`}
							/>
						</div>
					</div>
				))}
			</div>

			<div className="mt-6 pt-4 border-t border-[var(--border-color)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-[var(--text-muted)] font-mono">
				<span>* Lower latency is better (Measured in milliseconds)</span>
				<Magnetic strength={0.25}>
					<a
						href="https://github.com/rihadjahanopu/gladeshell/blob/main/benchmark.md"
						target="_blank"
						rel="noopener noreferrer"
						className="text-[var(--accent-primary)] hover:underline inline-block">
						Read full benchmark methodology →
					</a>
				</Magnetic>
			</div>
		</div>
	);
}
