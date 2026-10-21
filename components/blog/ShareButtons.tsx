"use client";

import { useTheme } from "../ThemeProvider";
import { Magnetic } from "../MagneticButton";
import { CopyIcon } from "../Icons";

interface ShareButtonsProps {
	title: string;
	url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
	const { playClick, showToast } = useTheme();

	const handleCopy = () => {
		playClick();
		navigator.clipboard.writeText(url);
		showToast("Article link copied to clipboard!");
	};

	const shareTwitter = () => {
		playClick();
		const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
			title
		)}&url=${encodeURIComponent(url)}&via=rihadjahanopu`;
		window.open(twitterUrl, "_blank", "noopener,noreferrer");
	};

	const shareLinkedIn = () => {
		playClick();
		const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
			url
		)}`;
		window.open(linkedInUrl, "_blank", "noopener,noreferrer");
	};

	return (
		<div className="flex flex-wrap items-center gap-2">
			<span className="text-xs font-mono text-[var(--text-muted)] mr-1">
				Share:
			</span>

			{/* Copy Link */}
			<Magnetic strength={0.25}>
				<button
					onClick={handleCopy}
					className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer">
					<CopyIcon className="w-3.5 h-3.5" />
					<span>Copy Link</span>
				</button>
			</Magnetic>

			{/* Twitter/X */}
			<Magnetic strength={0.25}>
				<button
					onClick={shareTwitter}
					className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[#1DA1F2] transition-all cursor-pointer">
					<span>𝕏</span>
					<span>Twitter</span>
				</button>
			</Magnetic>

			{/* LinkedIn */}
			<Magnetic strength={0.25}>
				<button
					onClick={shareLinkedIn}
					className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[#0A66C2] transition-all cursor-pointer">
					<span>💼</span>
					<span>LinkedIn</span>
				</button>
			</Magnetic>
		</div>
	);
}

