"use client";

import { useEffect, useState } from "react";
import { useTheme } from "../ThemeProvider";

interface TOCProps {
	items: {
		id: string;
		title: string;
	}[];
}

export default function TableOfContents({ items }: TOCProps) {
	const [activeId, setActiveId] = useState<string>("");
	const { playClick } = useTheme();

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{ rootMargin: "-80px 0% -60% 0%" }
		);

		items.forEach((item) => {
			const element = document.getElementById(item.id);
			if (element) observer.observe(element);
		});

		return () => observer.disconnect();
	}, [items]);

	const scrollTo = (id: string) => {
		playClick();
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<nav aria-label="Table of contents" className="p-5 rounded-3xl bg-[var(--bg-card)]/80 border border-[var(--border-color)] backdrop-blur-md shadow-xs sticky top-24">
			<div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--border-color)]">
				<span className="text-base">📑</span>
				<h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-bold">
					Table of Contents
				</h4>
			</div>

			<ul className="space-y-1.5 list-none text-xs font-mono">
				{items.map((item) => {
					const isActive = activeId === item.id;
					return (
						<li key={item.id}>
							<button
								onClick={() => scrollTo(item.id)}
								className={`w-full text-left py-1.5 px-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
									isActive
										? "bg-[var(--accent-primary)]/15 text-[var(--text-primary)] font-bold border border-[var(--accent-primary)]/30"
										: "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5"
								}`}>
								<span className="truncate">{item.title}</span>
								{isActive && (
									<span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] shrink-0 ml-2" />
								)}
							</button>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}

