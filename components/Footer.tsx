"use client";

import { memo } from "react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";
import { Magnetic } from "./MagneticButton";
import { ArrowUpIcon } from "./Icons";

const Footer = memo(function Footer() {
	const { playClick } = useTheme();

	const linkClass =
		"text-[var(--text-secondary)] no-underline transition-all duration-200 hover:text-[var(--text-primary)] hover:underline hover:underline-offset-8 decoration-[var(--accent-primary)] text-sm sm:text-base font-medium";

	const scrollToTop = () => {
		playClick();
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<footer className="py-12 border-t border-[var(--border-color)] mt-16 text-center">
			<div className="w-full flex flex-col items-center gap-6">
				{/* Brand Logo & Back to Top */}
				<div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
					<a
						href="#profile"
						onClick={playClick}
						className="transition-transform duration-300 hover:scale-105 block">
						<Image
							src="/assets/daynamikrihad.svg"
							alt="Logo"
							width={160}
							height={50}
							className="dark:invert"
							style={{ width: "8rem", height: "auto" }}
							unoptimized
						/>
					</a>

					<ul className="flex flex-wrap justify-center gap-6 sm:gap-8 list-none">
						{["Home", "About", "Experience", "Projects", "Blog", "Contact"].map((item) => (
							<li key={item}>
								<a
									className={linkClass}
									href={`#${item.toLowerCase() === "home" ? "profile" : item.toLowerCase()}`}
									onClick={playClick}>
									{item}
								</a>
							</li>
						))}
					</ul>

					<Magnetic strength={0.3}>
						<button
							onClick={scrollToTop}
							className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--border-color)] bg-white/5 hover:bg-white/10 text-xs font-mono text-[var(--text-secondary)] transition-all cursor-pointer">
							<span>Back to top</span>
							<ArrowUpIcon className="w-3.5 h-3.5" />
						</button>
					</Magnetic>
				</div>

				{/* Tech and Copyright */}
				<div className="flex flex-col sm:flex-row items-center justify-between w-full pt-6 border-t border-[var(--border-color)] text-xs font-mono text-[var(--text-muted)] gap-3">
					<p>
						🚀 Built with <span className="text-[var(--text-primary)] font-medium">Next.js 15, Tailwind CSS, Framer Motion & Pure Rust 🦀</span>
					</p>
					<p>
						© {new Date().getFullYear()} Rihad Jahan Opu. Crafted with 💖 in Sylhet.
					</p>
				</div>
			</div>
		</footer>
	);
});

export default Footer;