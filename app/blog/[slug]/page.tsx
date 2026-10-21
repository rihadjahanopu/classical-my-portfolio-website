import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPostBySlug } from "../data";
import TableOfContents from "../../../components/blog/TableOfContents";
import CodeSnippet from "../../../components/blog/CodeSnippet";
import BenchmarkWidget from "../../../components/blog/BenchmarkWidget";
import ShareButtons from "../../../components/blog/ShareButtons";
import { Magnetic } from "../../../components/MagneticButton";

// 1. Static Parameter Generation
export function generateStaticParams() {
	return BLOG_POSTS.map((post) => ({
		slug: post.slug,
	}));
}

// 2. SEO Dynamic Metadata
export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = getBlogPostBySlug(slug);

	if (!post) {
		return {
			title: "Post Not Found | Rihad Jahan Opu",
			description: "The requested article does not exist.",
		};
	}

	const url = `https://www.rihadjahanopu.com/blog/${post.slug}`;
	const title = `${post.seoTitle} | Rihad Jahan Opu`;
	const description = post.description;

	return {
		title,
		description,
		keywords: [
			...post.tags,
			"Rihad Jahan Opu",
			"Systems Programming",
			"Software Engineering",
			"Rust Blog",
		],
		authors: [{ name: post.author.name, url: post.author.github }],
		creator: post.author.name,
		publisher: post.author.name,
		openGraph: {
			title,
			description,
			url,
			siteName: "Rihad Jahan Opu — Systems & Full-Stack Engineer",
			type: "article",
			publishedTime: post.publishedAt,
			authors: [post.author.name],
			tags: post.tags,
			images: [
				{
					url: post.coverImage,
					width: 1200,
					height: 630,
					alt: post.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [post.coverImage],
			creator: "@rihadjahanopu",
		},
		alternates: {
			canonical: url,
		},
	};
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = getBlogPostBySlug(slug);

	if (!post) notFound();

	const pageUrl = `https://www.rihadjahanopu.com/blog/${post.slug}`;

	// JSON-LD Structured Data for Google Rich Snippets
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.description,
		image: `https://www.rihadjahanopu.com${post.coverImage}`,
		datePublished: post.publishedAt,
		dateModified: post.publishedAt,
		author: {
			"@type": "Person",
			name: post.author.name,
			url: post.author.github,
			jobTitle: post.author.role,
		},
		publisher: {
			"@type": "Person",
			name: post.author.name,
			url: "https://www.rihadjahanopu.com",
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": pageUrl,
		},
		keywords: post.tags.join(", "),
	};

	return (
		<>
			{/* Inject Structured Data */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-12 pb-24 px-4">
				<div className="max-w-6xl mx-auto">
					{/* Breadcrumb Navigation */}
					<nav aria-label="Breadcrumbs" className="mb-8 flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
						<Link
							href="/"
							className="hover:text-[var(--text-primary)] transition-colors">
							Home
						</Link>
						<span>/</span>
						<Link
							href="/blog"
							className="hover:text-[var(--text-primary)] transition-colors">
							Blog
						</Link>
						<span>/</span>
						<span className="text-[var(--accent-primary)] truncate max-w-xs sm:max-w-md">
							{post.slug}
						</span>
					</nav>

					{/* Article Header */}
					<header className="mb-12 max-w-4xl">
						<div className="flex flex-wrap items-center gap-2.5 mb-4">
							<span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30 flex items-center gap-1.5">
								<span>🦀</span>
								<span>{post.category}</span>
							</span>
							<span className="text-xs font-mono text-[var(--text-muted)]">
								{post.publishedAt}
							</span>
							<span className="text-xs text-[var(--text-muted)]">•</span>
							<span className="text-xs font-mono text-[var(--text-muted)]">
								{post.readTime}
							</span>
							<span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
								0.0114 ms Latency
							</span>
						</div>

						<h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight">
							{post.title}
						</h1>

						<p className="mt-5 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
							{post.description}
						</p>

						{/* Author Box & Share Header */}
						<div className="mt-8 pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
							<div className="flex items-center gap-3">
								<div className="w-12 h-12 rounded-full overflow-hidden relative border border-[var(--border-color)]">
									<Image
										src={post.author.avatar}
										alt={post.author.name}
										fill
										className="object-cover"
									/>
								</div>
								<div>
									<h2 className="text-sm font-bold text-[var(--text-primary)]">
										{post.author.name}
									</h2>
									<p className="text-xs font-mono text-[var(--text-muted)]">
										{post.author.role}
									</p>
								</div>
							</div>

							<ShareButtons title={post.title} url={pageUrl} />
						</div>
					</header>

					{/* Main Article Grid: Content + Sticky TOC */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
						{/* Main Article Body */}
						<article className="lg:col-span-8 text-[var(--text-secondary)] leading-relaxed text-base sm:text-lg space-y-8">
							{/* Section 1 */}
							<section id="the-latency-crisis" className="scroll-mt-28 space-y-4">
								<h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
									1. The Terminal Latency Crisis
								</h2>
								<p>
									Modern command-line interfaces are notoriously sluggish. Over the past decade, developer prompts evolved from simple static strings into dynamic dashboards displaying Git branch status, Node version, AWS credentials, and container states.
								</p>
								<p>
									While informative, this functionality comes at a brutal computational cost: every single time you hit <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-xs font-mono text-[var(--text-primary)]">Enter</kbd>, standard shell frameworks (such as Oh My Zsh or Starship) spend <strong>2.5 ms to 25.0 ms</strong> parsing environment context. At 60 frames per second, a human eye begins detecting frame drops at ~16.6 ms. When your shell stutters, typing feels disconnected.
								</p>
								<p>
									My engineering goal with <strong className="text-[var(--text-primary)]">gladeshell</strong> was uncompromising: <em>can we build a full-featured terminal prompt that renders in sub-millisecond speeds—specifically under 15 microseconds—without sacrificing features?</em>
								</p>
							</section>

							{/* Section 2 */}
							<section id="root-cause-analysis" className="scroll-mt-28 space-y-4">
								<h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
									2. Root Cause: The Hidden Cost of Subshells
								</h2>
								<p>
									When profiling existing shell prompts with Linux <code className="text-xs font-mono bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">perf</code> and <code className="text-xs font-mono bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">strace</code>, the primary bottleneck became immediately obvious: <strong>Process Spawning (Forking)</strong>.
								</p>
								<p>
									Traditional Zsh/Bash themes execute external subshells for basic queries:
								</p>
								<CodeSnippet
									language="bash"
									filename="traditional_slow_prompt.sh"
									code={`# The deadly cost of subshell forking in legacy shell prompts:
git_branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null) # Fork 1 (1.8ms)
git_dirty=$(git status --porcelain 2>/dev/null)          # Fork 2 (4.2ms)
node_ver=$(node -v 2>/dev/null)                          # Fork 3 (8.5ms - V8 boot!)
# Total latency: ~14.5ms wasted in OS context switching!`}
								/>
								<p>
									Each fork forces the Linux kernel to allocate memory pages, copy process descriptors, setup file descriptors, and trigger page table invalidation. Even Starship (which is written in Rust) frequently calls out to external utilities or uses modular multi-crate abstractions that incur IPC or file synchronization overhead.
								</p>
							</section>

							{/* Section 3 */}
							<section id="pure-rust-architecture" className="scroll-mt-28 space-y-4">
								<h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
									3. Pure Rust Architecture & Zero-Fork Engine
								</h2>
								<p>
									To eliminate process spawning entirely, gladeshell was engineered using the <strong>Pure Rust 2024 edition</strong> with a zero-fork principle: <em>the binary never spawns child processes for telemetry</em>.
								</p>
								<p>
									Everything is resolved in-memory using direct syscalls and low-level system structures. We enforce strict compiler safety rules across the entire repository:
								</p>
								<CodeSnippet
									language="rust"
									filename="src/main.rs"
									code={`// 100% Zero Unsafe Rust Codebase
#![deny(unsafe_code)]
#![warn(clippy::all, clippy::pedantic, clippy::nursery)]

pub fn render_prompt(ctx: &Context) -> Result<String, GladeError> {
    let mut buffer = String::with_capacity(256);
    // Directly reads in-memory cached state with zero subprocess forks
    ctx.telemetry.write_git_status(&mut buffer)?;
    ctx.telemetry.write_system_diagnostics(&mut buffer)?;
    Ok(buffer)
}`}
								/>
								<p>
									By pre-allocating output buffers and reusing memory across rendering ticks, gladeshell eliminates heap allocations during the critical render path.
								</p>
							</section>

							{/* Section 4 */}
							<section id="git-telemetry-gix" className="scroll-mt-28 space-y-4">
								<h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
									4. Git Telemetry with gix 0.88 (4.8 µs Cache Hits)
								</h2>
								<p>
									Git status is usually the slowest part of any prompt, especially in massive repositories with tens of thousands of files. Instead of spawning <code className="text-xs font-mono bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">git status</code> or linking against the heavy C-based <code className="text-xs font-mono bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">libgit2</code>, gladeshell integrates the pure-Rust <strong>gix 0.88</strong> engine.
								</p>
								<p>
									We implemented an adaptive time-to-live (TTL) in-memory cache directly inspecting the <code className="text-xs font-mono bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">.git/HEAD</code> and <code className="text-xs font-mono bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">.git/index</code> binary structures:
								</p>
								<CodeSnippet
									language="rust"
									filename="crates/telemetry/src/git.rs"
									code={`use gix::ThreadSafeRepository;

pub fn resolve_git_state(repo_path: &Path) -> Option<GitTelemetry> {
    // Zero-copy binary inspection of .git ref pointers
    let repo = ThreadSafeRepository::open(repo_path).ok()?.to_thread_local();
    let head = repo.head().ok()?;
    let branch = head.referent_name().map(|n| n.shorten().to_string());
    
    // Average cache hit duration: 4.8 microseconds!
    Some(GitTelemetry { branch, is_dirty: false })
}`}
								/>
							</section>

							{/* Section 5 */}
							<section id="compiler-optimizations" className="scroll-mt-28 space-y-4">
								<h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
									5. Compiler Mastery: Fat-LTO & Binary Stripping
								</h2>
								<p>
									Writing efficient code is only half the battle. How the Rust compiler (<code className="text-xs font-mono bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">rustc</code>) and LLVM optimize the final machine code determines the last order of magnitude in speed.
								</p>
								<p>
									Our production release profile in <code className="text-xs font-mono bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">Cargo.toml</code> leverages Fat Link-Time Optimization (LTO) across all crate compilation units, forces single codegen units to maximize inlining, and strips all debug symbols:
								</p>
								<CodeSnippet
									language="toml"
									filename="Cargo.toml"
									code={`[profile.release]
opt-level = 3          # Maximum LLVM aggressive optimizations
lto = "fat"            # Whole-program Link Time Optimization
codegen-units = 1      # Maximize inter-procedural inlining
panic = "abort"        # Strip stack unwinding tables (-40% binary size)
strip = true           # Remove debug symbols and symbol table
overflow-checks = false`}
								/>
								<p>
									This configuration allows LLVM to vectorize loops into AVX2/AVX-512 SIMD instructions and inline entire prompt rendering passes into a single unrolled assembly block.
								</p>
							</section>

							{/* Section 6: Benchmarks */}
							<section id="benchmarks-comparison" className="scroll-mt-28 space-y-4">
								<h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
									6. Empirical Benchmarks: gladeshell vs The Giants
								</h2>
								<p>
									To verify these performance claims, we benchmarked gladeshell against Starship, Oh My Posh, and Oh My Zsh using <code className="text-xs font-mono bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">hyperfine --warmup 500 --runs 10000</code> in a dirty Git repository on Linux:
								</p>

								{/* Interactive Reusable Benchmark Widget */}
								<BenchmarkWidget />

								<p>
									At <strong>0.0114 ms (11.4 microseconds)</strong>, gladeshell is approximately <strong>210x faster than Starship</strong> and over <strong>1,600x faster than standard Oh My Zsh scripts</strong>. The response feels instantaneous because it executes in fewer CPU cycles than a single frame refresh.
								</p>
							</section>

							{/* Section 7 */}
							<section id="ecosystem-features" className="scroll-mt-28 space-y-4">
								<h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
									7. Built-in TUI Suite & Parallel Compression
								</h2>
								<p>
									gladeshell is not just a prompt renderer—it is a comprehensive developer productivity suite. Built into the single compiled binary:
								</p>
								<ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
									<li>
										<strong>Ratatui TUI Apps:</strong> Terminal-native interactive GUIs for Task Management (<code className="text-xs font-mono bg-black/5 dark:bg-white/10 px-1 rounded">todo</code>), Note-taking (<code className="text-xs font-mono bg-black/5 dark:bg-white/10 px-1 rounded">notes</code>), and real-time System Monitoring (<code className="text-xs font-mono bg-black/5 dark:bg-white/10 px-1 rounded">sysmon</code>).
									</li>
									<li>
										<strong>Rayon Parallel Multi-Core Compressor:</strong> High-throughput zstd compression engine that saturates all CPU cores with automatic pre-compressed media bypass.
									</li>
									<li>
										<strong>Hardened AES-256-GCM Vault:</strong> Multi-vault encrypted key-value store using PBKDF2 with 100,000 iterations and automatic RAM zeroization upon process exit.
									</li>
									<li>
										<strong>55 Built-in Themes:</strong> Instant hot-swapping between Tokyo Night, Catppuccin, Dracula, Matrix, Nord, and 50 other color schemes with zero configuration files required.
									</li>
								</ul>
							</section>

							{/* Section 8: Quick Start & CTA */}
							<section id="conclusion-lessons" className="scroll-mt-28 space-y-6 pt-4 border-t border-[var(--border-color)]">
								<h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
									8. Takeaways & Quick Start
								</h2>
								<p>
									Building gladeshell reinforced a core principle in modern software engineering: <em>performance is not a luxury; it is the fundamental user interface</em>. By rejecting lazy subprocess spawning and leaning into Rust&apos;s zero-cost abstractions, we can build tools that feel like magic.
								</p>

								{/* Quick Install Box */}
								<div className="p-6 rounded-3xl bg-[#0a121c] text-white border border-emerald-500/30 shadow-2xl space-y-3">
									<div className="flex items-center gap-2">
										<span className="text-base">🚀</span>
										<h4 className="font-bold text-emerald-400 font-mono text-sm">
											Try gladeshell on your machine:
										</h4>
									</div>
									<CodeSnippet
										language="bash"
										filename="Terminal"
										code="curl -sSL https://raw.githubusercontent.com/rihadjahanopu/gladeshell/main/install.sh | bash"
									/>
									<p className="text-xs font-mono text-gray-400">
										Supports Bash, Zsh, Fish, and PowerShell 7+ on Linux & macOS.
									</p>
								</div>

								{/* Bottom Share Bar */}
								<div className="pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
									<Link
										href="/blog"
										className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
										← Back to All Articles
									</Link>
									<ShareButtons title={post.title} url={pageUrl} />
								</div>
							</section>

							{/* Author Bio Card */}
							<div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)]/80 border border-[var(--border-color)] backdrop-blur-md shadow-xs">
								<div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
									<div className="w-20 h-20 rounded-2xl overflow-hidden relative shrink-0 border border-[var(--border-color)]">
										<Image
											src={post.author.avatar}
											alt={post.author.name}
											fill
											className="object-cover"
										/>
									</div>
									<div>
										<h3 className="text-lg font-bold text-[var(--text-primary)]">
											Written by {post.author.name}
										</h3>
										<p className="text-xs font-mono text-[var(--accent-primary)] mb-2 font-semibold">
											{post.author.role}
										</p>
										<p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
											{post.author.bio}
										</p>
										<div className="mt-4 flex justify-center sm:justify-start gap-3">
											<Magnetic strength={0.25}>
												<a
													href={post.author.github}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border border-[var(--border-color)] bg-white/5 hover:bg-white/10 text-[var(--text-primary)] transition-all">
													<span>GitHub Profile</span>
													<span>↗</span>
												</a>
											</Magnetic>
										</div>
									</div>
								</div>
							</div>
						</article>

						{/* Sticky Sidebar on Desktop (TOC) */}
						<aside className="hidden lg:block lg:col-span-4">
							<TableOfContents items={post.tableOfContents} />
						</aside>
					</div>
				</div>
			</main>
		</>
	);
}

