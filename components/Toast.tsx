"use client";

import { useTheme } from "./ThemeProvider";

export default function Toast() {
	const { toastMessage } = useTheme();

	if (!toastMessage) return null;

	return (
		<div className="fixed bottom-6 right-6 z-[99999] pointer-events-none animate-in fade-in slide-in-from-bottom-5 duration-300">
			<div className="bg-[#18181b]/95 dark:bg-[#181825]/95 text-white text-xs sm:text-sm font-medium px-4 py-3 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-xl flex items-center gap-2.5 max-w-[90vw]">
				<span className="text-emerald-400 font-bold">✓</span>
				<span className="tracking-wide break-words">{toastMessage}</span>
			</div>
		</div>
	);
}

