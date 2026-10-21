"use client";

import { memo } from "react";
import Link from "next/link";
import { BLOG_POSTS } from "../app/blog/data";
import BlogCard from "./blog/BlogCard";
import { Magnetic } from "./MagneticButton";
import { useTheme } from "./ThemeProvider";

const Blog = memo(function Blog() {
	const { playClick } = useTheme();
	const featuredPost = BLOG_POSTS[0];

	return (
		<section id="blog" className="scroll-mt-32 pt-20 pb-16 w-full">
			{/* Section Header */}
			<div className="text-center mb-10">
				<p className="text-sm font-mono uppercase tracking-wider text-[var(--text-muted)]">
					📝 Technical Writing & Post-Mortems
				</p>
				<h2 className="text-4xl md:text-5xl font-bold tracking-tight title text-[var(--text-primary)] mt-1">
					Engineering Blog
				</h2>
				<p className="text-sm text-[var(--text-secondary)] mt-2 max-w-xl mx-auto">
					Deep-dives into systems engineering, sub-millisecond Rust architectures, compiler optimizations, and production infrastructure.
				</p>
			</div>

			{/* Featured Blog Card */}
			<div className="w-full">
				<BlogCard post={featuredPost} featured={true} />
			</div>

			{/* Footer CTA */}
			<div className="mt-8 flex justify-center">
				<Magnetic strength={0.25}>
					<Link
						href="/blog"
						onClick={playClick}
						className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] hover:bg-black/5 dark:hover:bg-white/5 text-xs sm:text-sm font-mono font-medium text-[var(--text-primary)] transition-all shadow-xs">
						<span>Browse All Articles & Deep-Dives</span>
						<span>→</span>
					</Link>
				</Magnetic>
			</div>
		</section>
	);
});

export default Blog;

