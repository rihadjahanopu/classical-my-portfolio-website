export interface BlogPost {
	id: string;
	slug: string;
	title: string;
	seoTitle: string;
	description: string;
	publishedAt: string;
	readTime: string;
	category: string;
	tags: string[];
	coverImage: string;
	metrics: {
		latency: string;
		speedup: string;
		memory: string;
		edition: string;
	};
	author: {
		name: string;
		role: string;
		avatar: string;
		bio: string;
		github: string;
	};
	tableOfContents: {
		id: string;
		title: string;
	}[];
}

export const BLOG_POSTS: BlogPost[] = [
	{
		id: "1",
		slug: "engineering-gladeshell-0-0114ms-latency-rust-terminal",
		title: "How I Engineered gladeshell: Building a 0.0114ms Sub-Millisecond Terminal in Pure Rust",
		seoTitle: "Engineering gladeshell: 0.0114ms Pure Rust Sub-Millisecond Terminal",
		description:
			"An in-depth technical post-mortem on how we built gladeshell in Pure Rust (2024 edition) with zero process forks, achieving 0.0114ms prompt latency (~210x faster than Starship) with Ratatui TUIs and memory safety.",
		publishedAt: "2026-10-15",
		readTime: "7 min read",
		category: "Systems & Rust",
		tags: [
			"Rust 2024",
			"Systems Architecture",
			"Low Latency",
			"gladeshell",
			"CLI Engineering",
			"Linux",
		],
		coverImage: "/assets/project-1.png",
		metrics: {
			latency: "0.0114 ms",
			speedup: "210x Faster",
			memory: "1.2 MB RSS",
			edition: "Pure Rust 2024",
		},
		author: {
			name: "Rihad Jahan Opu",
			role: "Systems & Full-Stack Engineer",
			avatar: "/assets/rihadprofile.jpg",
			bio: "Creator of gladeshell. Obsessed with high-throughput systems, zero-cost abstractions, memory safety, and crafting seamless developer tooling.",
			github: "https://github.com/rihadjahanopu",
		},
		tableOfContents: [
			{ id: "the-latency-crisis", title: "1. The Terminal Latency Crisis" },
			{ id: "root-cause-analysis", title: "2. Root Cause: The Hidden Cost of Subshells" },
			{ id: "pure-rust-architecture", title: "3. Pure Rust Architecture & Zero-Fork Engine" },
			{ id: "git-telemetry-gix", title: "4. Git Telemetry with gix 0.88 (4.8 µs Cache Hits)" },
			{ id: "compiler-optimizations", title: "5. Compiler Mastery: Fat-LTO & Binary Stripping" },
			{ id: "benchmarks-comparison", title: "6. Empirical Benchmarks: gladeshell vs The Giants" },
			{ id: "ecosystem-features", title: "7. Built-in TUI Suite & Parallel Compression" },
			{ id: "conclusion-lessons", title: "8. Takeaways & Quick Start" },
		],
	},
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
	return BLOG_POSTS.find((p) => p.slug === slug);
}

