export interface Project {
	id: number;
	title: string;
	image: string;
	imageAlt?: string;
	github: string;
	liveDemo: string;
	techStack: string[];
	description: string;
	features?: string[];
	highlights?: string[];
	challenges: string[];
	futurePlans: string[];
	isOpenSource?: boolean;
	license?: string;
}

export const projectsData: Project[] = [
	{
		id: 1,
		title: "Digital Life Lessons",
		image: "/assets/project-1.png",
		imageAlt: "Digital Life Lessons - Interactive Educational Platform",
		github: "https://github.com/rihadjahanopu/life-lesson-client",
		liveDemo: "https://life-lesson-client.vercel.app/",
		techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Stripe"],
		description:
			"An engaging educational web application providing structured interactive lessons, user dashboards, a rich-text editor for notes, robust JWT authentication, and secure Stripe payment processing.",
		features: [
			"Interactive structured learning modules with visual progress tracking.",
			"Custom built rich-text note editor for student study journals.",
			"Secure end-to-end payment processing with Stripe Checkout.",
			"Responsive analytics dashboard for user learning stats.",
		],
		challenges: [
			"Integrating complex payment gateways securely with webhook validation.",
			"Optimizing dynamic images and rich-text assets for faster loading speeds.",
		],
		futurePlans: [
			"Add AI-assisted task auto-categorization and smart quizzes.",
			"Implement team collaboration features with real-time web sockets.",
		],
	},
	{
		id: 2,
		title: "MarketPlace Buy & Sell",
		image: "/assets/project-2.png",
		imageAlt: "MarketPlace Buy & Sell - Full-Stack E-Commerce Platform",
		github: "https://github.com/rihadjahanopu/marketplace-client",
		liveDemo: "https://marketplace-client-bay.vercel.app/",
		techStack: ["React", "Redux Toolkit", "Node.js", "Express", "Tailwind CSS", "Radix UI"],
		description:
			"A full-featured e-commerce platform offering an intuitive shopping experience, real-time cart state management via Redux Toolkit, accessible UI components with Radix UI, and instant inventory tracking.",
		features: [
			"Real-time shopping cart and checkout synchronization via Redux Toolkit.",
			"Server-side rendering (SSR) with Next.js for high performance and SEO.",
			"Accessible and smooth component design utilizing Radix UI primitives.",
			"Secure RESTful API integration for order management and inventory updates.",
		],
		challenges: [
			"Handling real-time state synchronization across multiple tabs and devices.",
			"Structuring normalized Redux store to manage cart, filters, and product cache efficiently.",
		],
		futurePlans: [
			"Integrate system-wide dark mode support.",
			"Implement multi-currency and multi-language internationalization.",
		],
	},
	{
		id: 3,
		title: "Nexus AI",
		image: "/assets/project-3.png",
		imageAlt: "Nexus AI - Intelligent Project Workspace & Agentic Assistant",
		github: "https://github.com/rihadjahanopu/nexes-ai-client",
		liveDemo: "https://nexes-ai-client.vercel.app/",
		techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Google Gemini API"],
		description:
			"Nexus AI Client is an intelligent project management workspace that pairs modern workflow tracking with an embedded Agentic AI chat assistant powered by Google Gemini for contextual assistance and code generation.",
		features: [
			"Conversational Agentic AI interface powered by Google Gemini API.",
			"Live streaming AI responses with markdown and syntax-highlighted code blocks.",
			"Kanban-style project and task management with real-time status updates.",
			"Strict security headers and content-security policies via Helmet.",
		],
		challenges: [
			"Managing real-time streaming AI chat chunks without UI stuttering.",
			"Configuring complex Helmet security policies and optimizing dynamic SEO routes.",
		],
		futurePlans: [
			"Add automated email summaries and project progress alerts.",
			"Implement AI-driven task estimation and project roadmap forecasting.",
		],
	},
	{
		id: 4,
		title: "gladeshell",
		image: "/assets/gladeshell.png",
		imageAlt: "gladeshell - Ultra-fast Pure Rust Shell Environment and Developer Suite",
		github: "https://github.com/rihadjahanopu/gladeshell",
		liveDemo: "https://gladeshell.netlify.app",
		isOpenSource: true,
		license: "MIT License",
		techStack: [
			"Rust (2024 Edition)",
			"Ratatui TUI",
			"Gitoxide (gix)",
			"Rayon",
			"AES-256 GCM",
			"Zstandard",
			"Shell (Bash / Zsh / Fish / Pwsh)",
			"Open Source (MIT)",
		],
		description:
			"An open-source (MIT Licensed), ultra-high-performance pure Rust shell environment and developer suite delivering a record 0.0114 ms (11.4 µs) prompt latency (~210x faster than Starship). Designed with zero external runtime dependencies and strict '#![deny(unsafe_code)]' memory safety, it integrates 55 hot-swappable prompt themes, pure Rust Git telemetry ('gix 0.88'), native Ratatui TUI utilities (Todo, Notes, Process Monitor), parallel Rayon multi-core compression, a 24-in-1 FFmpeg multimedia suite, and a hardened AES-256 PBKDF2 security vault.",
		highlights: [
			"0.0114 ms (11.4 µs) Core Prompt Latency (Criterion micro-benchmarked)",
			"0 Subshell Process Forks (Eliminates shell spawn overhead completely)",
			"~3.9 MB RSS Memory Footprint (Fat-LTO compiled & stripped)",
			"7-Platform Native Release Matrix (Linux glibc/musl, macOS ARM/x86, Windows)",
		],
		features: [
			"⚡ Sub-Millisecond Smart Prompt: 0.0114 ms prompt latency with zero subshell forks and live runtime badges (Rust, Node, Bun, Python, Docker).",
			"🦀 100% Pure Rust Architecture: Compiled binary with strict memory safety guarantees and zero external runtime dependencies.",
			"🌿 Subshell-Free Git Telemetry: Pure Rust 'gix 0.88' engine providing 4.8 µs cache hits and adaptive monorepo TTL tracking.",
			"🎨 55 Prompt Themes: Instant hot-swapping between Tokyo Night, Catppuccin, Dracula, Matrix, Gruvbox, Nord, and 49 more.",
			"🖥️ Ratatui TUI Developer Apps: Terminal-native interactive GUIs for Task Management (Todo), Notes, and System Diagnostics ('sysmon').",
			"🗜️ Rayon Parallel Multi-Core Compressor: High-throughput parallel zstd compression engine with smart pre-compressed media bypass.",
			"🔐 Hardened AES-256-GCM Vault: Multi-vault encryption with PBKDF2 (100,000 iterations), automatic RAM zeroization, and decoy panic mode.",
			"🎬 24-in-1 FFmedia Suite: Swiss Army knife for FFmpeg video/audio compression, GIF conversions, visualizers, and screen capture.",
			"🔄 Universal Cross-Shell Integration: 1-command in-memory bootstrap for Bash, Zsh, Fish, and PowerShell 7+ ('eval $(gladeshell init <shell>)').",
			"📦 Mega Updater ('uup') & Cleaner ('uu'): Cross-platform interactive application remover across apt, snap, flatpak, and AppImage.",
		],
		challenges: [
			"Engineering a zero-subshell-fork prompt engine that renders git and telemetry in 11.4 µs using pure Rust ('gix 0.88'), bypassing traditional subshell bottlenecks.",
			"Implementing a fast-path CLI dispatcher that completely bypasses heavy argument parsing overhead for hot-path commands ('prompt', 'init').",
			"Achieving cross-shell compatibility (Bash, Zsh, Fish, PowerShell) with safe, idempotent in-memory loaders that never corrupt existing shell configs.",
			"Hardening the AES-256 directory vault with RAM zeroization ('zeroize') to guarantee encryption keys are wiped from memory immediately upon exit.",
		],
		futurePlans: [
			"Integrate an embedded local AI command assistant for context-aware shell workflow suggestions.",
			"Publish automated packages to Homebrew, Arch User Repository (AUR), Scoop, and crates.io.",
			"Build a modular Lua/WASM plugin engine for custom user-created Ratatui TUI extensions.",
			"Implement an eBPF-powered real-time system latency and process tracing module.",
		],
	},
];
