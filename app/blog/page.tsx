import Link from "next/link";
import { BLOG_POSTS } from "./data";
import BlogCard from "../../components/blog/BlogCard";
import { Magnetic } from "../../components/MagneticButton";

export const metadata = {
	title: "Engineering Blog | Rihad Jahan Opu",
	description:
		"Technical deep-dives into systems engineering, pure Rust 2024 architecture, sub-millisecond latency, compiler optimizations, and distributed web platforms.",
	keywords: [
		"Rihad Jahan Opu",
		"Engineering Blog",
		"Rust Programming",
		"Systems Engineering",
		"gladeshell",
		"Next.js",
		"Performance Optimization",
	],
	openGraph: {
		title: "Engineering Blog | Rihad Jahan Opu",
		description:
			"Technical deep-dives into systems engineering, pure Rust architecture, and compiler optimizations by Rihad Jahan Opu.",
		url: "https://www.rihadjahanopu.com/blog",
		siteName: "Rihad Jahan Opu",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Engineering Blog | Rihad Jahan Opu",
		description:
			"Technical deep-dives into systems engineering, pure Rust architecture, and compiler optimizations by Rihad Jahan Opu.",
	},
	alternates: {
		canonical: "https://www.rihadjahanopu.com/blog",
	},
};

export default function BlogIndexPage() {
	return (
		<main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-12 pb-24 px-4">
			<div className="max-w-6xl mx-auto">
				{/* Top Back Nav */}
				<div className="mb-8">
					<Magnetic strength={0.25}>
						<Link
							href="/#blog"
							className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
							<span>← Back to Home</span>
						</Link>
					</Magnetic>
				</div>

				{/* Header */}
				<header className="mb-12 text-center max-w-2xl mx-auto">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-3">
						<span>📝</span>
						<span>Technical Writing & Post-Mortems</span>
					</div>
					<h1 className="text-4xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
						Engineering Blog
					</h1>
					<p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
						Deep-dives into systems programming, 0.0114ms sub-millisecond terminal architecture, compiler optimizations, and production cloud infrastructure.
					</p>
				</header>

				{/* Article Feed */}
				<div className="space-y-8">
					{BLOG_POSTS.map((post) => (
						<BlogCard key={post.id} post={post} featured={true} />
					))}
				</div>
			</div>
		</main>
	);
}

