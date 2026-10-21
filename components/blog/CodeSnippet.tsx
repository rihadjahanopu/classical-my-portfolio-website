"use client";

import { useState } from "react";
import { useTheme } from "../ThemeProvider";
import { CopyIcon } from "../Icons";

interface CodeSnippetProps {
	filename?: string;
	language?: string;
	code: string;
}

export default function CodeSnippet({
	filename,
	language = "rust",
	code,
}: CodeSnippetProps) {
	const [copied, setCopied] = useState(false);
	const { playClick, showToast } = useTheme();

	const handleCopy = () => {
		playClick();
		navigator.clipboard.writeText(code);
		setCopied(true);
		showToast("Code copied to clipboard!");
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="my-6 rounded-2xl overflow-hidden border border-white/10 bg-[#0c1017] shadow-xl text-xs sm:text-sm font-mono text-gray-200">
			{/* Top Bar */}
			<div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/10 text-xs">
				<div className="flex items-center gap-2">
					<div className="flex items-center gap-1.5">
						<span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
						<span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
						<span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
					</div>
					{filename && (
						<span className="text-gray-400 font-medium ml-2">{filename}</span>
					)}
				</div>

				<div className="flex items-center gap-2">
					<span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
						{language}
					</span>
					<button
						onClick={handleCopy}
						className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all cursor-pointer text-xs"
						title="Copy code">
						<CopyIcon className="w-3.5 h-3.5" />
						<span>{copied ? "Copied!" : "Copy"}</span>
					</button>
				</div>
			</div>

			{/* Code Pre/Code block */}
			<div className="p-4 overflow-x-auto [scrollbar-width:none]">
				<pre className="leading-relaxed">
					<code>{code}</code>
				</pre>
			</div>
		</div>
	);
}

