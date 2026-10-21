"use client";

import Link from "next/link";
import { BlogPost } from "../../app/blog/data";
import { Magnetic } from "../MagneticButton";
import { useTheme } from "../ThemeProvider";

interface BlogCardProps {
	post: BlogPost;
	featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
	const { playClick } = useTheme();

	return (
		<article
			className={`group relative flex flex-col justify-between rounded-3xl bg-[var(--bg-card)]/80 border border-[var(--border-color)] hover:border-[var(--accent-primary)]/40 p-6 sm:p-8 backdrop-blur-md shadow-sm hover:shadow-2xl transition-all duration-300 ${
				featured ? "lg:grid lg:grid-cols-12 lg:gap-8" : ""
			}`}>
			{/* Top Highlights */}
			<div className={featured ? "lg:col-span-8 flex flex-col justify-between" : ""}>
				<div>
					{/* Meta Header */}
					<div className="flex flex-wrap items-center gap-2 mb-4">
						<span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center gap-1.5">
							<span>🦀</span>
							<span>{post.category}</span>
						</span>
						<span className="text-xs font-mono text-[var(--text-muted)]">
							{post.publishedAt}
						</span>
						<span className="text-[var(--text-muted)] text-xs hidden sm:inline">•</span>
						<span className="text-xs font-mono text-[var(--text-muted)]">
							{post.readTime}
						</span>
						{featured && (
							<span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
								FEATURED DEEP DIVE
							</span>
						)}
					</div>

					{/* Title */}
					<h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors tracking-tight leading-snug">
						<Link href={`/blog/${post.slug}`} onClick={playClick}>
							{post.title}
						</Link>
					</h3>

					{/* Excerpt */}
					<p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
						{post.description}
					</p>

					{/* Tags */}
					<div className="flex flex-wrap gap-1.5 mt-5">
						{post.tags.map((t) => (
							<span
								key={t}
								className="text-[11px] font-mono px-2.5 py-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-[var(--text-secondary)]">
								#{t}
							</span>
						))}
					</div>
				</div>

				{/* CTA Button */}
				<div className="mt-6 pt-4 border-t border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
					<div className="flex items-center gap-2">
						<span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
						<span className="text-xs font-mono text-emerald-500 font-bold whitespace-nowrap">
							{post.metrics.latency} Latency ({post.metrics.speedup})
						</span>
					</div>

					<Magnetic strength={0.25} className="w-full sm:w-auto">
						<Link
							href={`/blog/${post.slug}`}
							onClick={playClick}
							className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 font-mono text-xs font-bold transition-all shadow-md whitespace-nowrap group-hover:gap-3">
							<span>Read Full Article</span>
							<span>→</span>
						</Link>
					</Magnetic>
				</div>
			</div>

			{/* Metric Box (for Featured) */}
			{featured && (
				<div className="mt-6 lg:mt-0 lg:col-span-4 p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)] flex flex-col justify-center gap-3">
					<div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
						⚡ Architecture Spec
					</div>
					<div className="space-y-2 font-mono text-xs">
						<div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
							<span className="text-[var(--text-muted)]">Engine</span>
							<span className="font-bold text-[var(--text-primary)]">
								{post.metrics.edition}
							</span>
						</div>
						<div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
							<span className="text-[var(--text-muted)]">Render Latency</span>
							<span className="font-bold text-emerald-500">
								{post.metrics.latency}
							</span>
						</div>
						<div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
							<span className="text-[var(--text-muted)]">Peak RSS</span>
							<span className="font-bold text-purple-400">
								{post.metrics.memory}
							</span>
						</div>
						<div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
							<span className="text-[var(--text-muted)]">Safety Guarantee</span>
							<span className="font-bold text-blue-400">
								100% #![deny(unsafe)]
							</span>
						</div>
					</div>
				</div>
			)}
		</article>
	);
}

