"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { Magnetic } from "./MagneticButton";

interface HistoryItem {
	command: string;
	output: React.ReactNode;
}

export default function GladeshellTerminal() {
	const [input, setInput] = useState("");
	const [history, setHistory] = useState<HistoryItem[]>([
		{
			command: "gladeshell --version",
			output: (
				<div className="text-emerald-400 font-mono text-xs leading-relaxed">
					<p>⚡ gladeshell v1.2.13 (x86_64-linux / pure rust engine)</p>
					<p className="text-gray-400">
						Type <span className="text-cyan-300 font-bold">help</span> or tap
						the command pills below.
					</p>
				</div>
			),
		},
	]);
	const terminalBottomRef = useRef<HTMLDivElement>(null);
	const { playClick, showToast } = useTheme();

	useEffect(() => {
		terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [history]);

	const executeCommand = (cmd: string) => {
		const trimmed = cmd.trim().toLowerCase();
		playClick();

		let output: React.ReactNode = null;

		switch (trimmed) {
			case "help":
				output = (
					<div className="space-y-1 text-xs text-gray-300 font-mono">
						<p className="text-cyan-400 font-semibold">Available Commands:</p>
						<p>• <span className="text-yellow-300">about</span> — Overview of Rihad Jahan Opu</p>
						<p>• <span className="text-yellow-300">benchmarks</span> — gladeshell vs Starship latency</p>
						<p>• <span className="text-yellow-300">skills</span> — Systems, Frontend & Backend tools</p>
						<p>• <span className="text-yellow-300">install</span> — Copy one-line install script</p>
						<p>• <span className="text-yellow-300">clear</span> — Reset terminal history</p>
					</div>
				);
				break;
			case "about":
				output = (
					<div className="space-y-1 text-xs text-gray-300 font-mono">
						<p className="text-white font-semibold">Rihad Jahan Opu</p>
						<p>Full-Stack Developer & Pure Rust Systems Builder.</p>
						<p>Creator of gladeshell (0.0114ms latency terminal suite) & Open-Source Systems Engineer.</p>
						<p className="text-gray-400">Location: Sylhet, Bangladesh (GMT+6)</p>
					</div>
				);
				break;
			case "benchmarks":
				output = (
					<div className="space-y-1.5 text-xs font-mono">
						<p className="text-cyan-400 font-semibold">Empirical Prompt Latency:</p>
						<p className="text-emerald-400">⚡ gladeshell: 0.0114 ms (11.4 µs) [210x FASTER] 🏆</p>
						<p className="text-amber-400">🚀 Starship  : 2.40 ms (exec overhead)</p>
						<p className="text-orange-400">🎨 Oh My Posh: 8.20 ms (GC runtime)</p>
						<p className="text-rose-400">🐚 Oh My Zsh : 18.50 ms (subshell forks)</p>
					</div>
				);
				break;
			case "skills":
				output = (
					<div className="space-y-1 text-xs font-mono text-gray-300">
						<p className="text-purple-400 font-semibold">Primary Arsenal:</p>
						<p>• <span className="text-white">Systems:</span> Rust (2024), Gitoxide, Ratatui, Rayon, AES-256</p>
						<p>• <span className="text-white">Frontend:</span> Next.js, React, TypeScript, Tailwind, GSAP</p>
						<p>• <span className="text-white">Backend:</span> Node.js, Express, MongoDB, Docker, Linux</p>
					</div>
				);
				break;
			case "install":
				if (typeof navigator !== "undefined") {
					navigator.clipboard.writeText("curl -fsSL https://gladeshell.netlify.app/install.sh | bash");
					showToast("Install command copied to clipboard!");
				}
				output = (
					<div className="text-xs font-mono text-emerald-400">
						<p>✓ Copied to clipboard:</p>
						<p className="text-gray-300 select-all">curl -fsSL https://gladeshell.netlify.app/install.sh | bash</p>
					</div>
				);
				break;
			case "clear":
				setHistory([]);
				setInput("");
				return;
			default:
				output = (
					<p className="text-xs font-mono text-rose-400">
						command not found: {cmd}. Type <span className="text-cyan-300">help</span> for commands.
					</p>
				);
		}

		setHistory((prev) => [...prev, { command: cmd, output }]);
		setInput("");
	};

	return (
		<div className="w-full max-w-3xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--border-color)] bg-[#0d1017] dark:bg-[#0b0d13] shadow-2xl text-left font-mono relative z-10">
			{/* Terminal Header Bar */}
			<div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5 gap-2">
				<div className="flex items-center gap-2 min-w-0">
					<span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shrink-0" />
					<span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shrink-0" />
					<span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shrink-0" />
					<span className="ml-2 text-xs text-gray-300 font-medium hidden sm:inline truncate">
						gladeshell — pure rust terminal preview
					</span>
				</div>
				<span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
					0.0114 ms latency
				</span>
			</div>

			{/* Terminal Output Area */}
			<div className="p-4 sm:p-5 min-h-[160px] max-h-64 sm:max-h-72 overflow-y-auto space-y-3 [scrollbar-width:none] break-words text-left">
				{history.map((item, idx) => (
					<div key={idx} className="space-y-1">
						<div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-gray-400">
							<span className="text-emerald-400 font-bold shrink-0">rihad@gladeshell</span>
							<span className="text-cyan-400 shrink-0">~</span>
							<span className="text-white break-all">$ {item.command}</span>
						</div>
						<div className="pl-3 break-words text-gray-200">{item.output}</div>
					</div>
				))}
				<div ref={terminalBottomRef} />
			</div>

			{/* Quick Command Pills */}
			<div className="px-4 py-2.5 bg-black/40 border-t border-white/10 flex flex-wrap items-center gap-1.5 sm:gap-2">
				<span className="text-[11px] text-gray-400 mr-1 hidden sm:inline">Quick Tap:</span>
				{["help", "benchmarks", "skills", "install", "clear"].map((btn) => (
					<Magnetic key={btn} strength={0.25}>
						<button
							onClick={() => executeCommand(btn)}
							className="text-xs px-2.5 py-1 rounded-lg bg-white/10 hover:bg-emerald-500/20 text-gray-200 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/30 font-medium active:scale-95 transition-all cursor-pointer">
							{btn}
						</button>
					</Magnetic>
				))}
			</div>

			{/* Input Prompt */}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (input.trim()) executeCommand(input);
				}}
				className="flex items-center px-4 py-3 border-t border-white/10 bg-black/60 gap-2">
				<span className="text-emerald-400 text-xs font-bold shrink-0">➜</span>
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="type a command (e.g. help, benchmarks)..."
					className="w-full bg-transparent outline-none text-xs sm:text-sm text-white placeholder-gray-500 font-mono"
				/>
			</form>
		</div>
	);
}

