"use client";

import { useEffect, useState } from "react";

export default function TimezoneBadge() {
	const [timeString, setTimeString] = useState<string>("");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const updateTime = () => {
			try {
				const now = new Date();
				const formatted = new Intl.DateTimeFormat("en-US", {
					timeZone: "Asia/Dhaka",
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
					hour12: true,
				}).format(now);
				setTimeString(formatted);
			} catch {
				setTimeString(new Date().toLocaleTimeString());
			}
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, []);

	if (!mounted) {
		return (
			<div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-2xl sm:rounded-full border border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-md text-xs text-[var(--text-secondary)] shadow-xs">
				<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
				<span>📍 Sylhet, BD (GMT+6)</span>
			</div>
		);
	}

	return (
		<div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-2xl sm:rounded-full border border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-md text-xs text-[var(--text-secondary)] shadow-xs transition-all duration-300">
			<span className="flex items-center gap-1.5">
				<span className="relative flex h-2 w-2 shrink-0">
					<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
					<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
				</span>
				<span className="font-medium text-emerald-500">
					Available for Hire
				</span>
			</span>

			<span className="hidden sm:inline text-gray-400 dark:text-gray-600">•</span>

			<span className="flex items-center gap-1 font-mono text-[11px] sm:text-xs">
				<span className="truncate">📍 Sylhet, BD (GMT+6)</span>
				<span className="text-gray-400 dark:text-gray-600">•</span>
				<span className="font-semibold text-[var(--text-primary)] shrink-0 flex items-center gap-1">
					<span>⏰</span>
					<span>{timeString}</span>
				</span>
			</span>
		</div>
	);
}

