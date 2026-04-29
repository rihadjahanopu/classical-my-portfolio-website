"use client";

import { memo } from "react";
import Image from "next/image";

const Navbar = memo(function Navbar({ menuOpen, toggleMenu }) {
	const linkClass =
		"text-black no-underline transition-all duration-300 hover:text-gray-500 hover:underline hover:underline-offset-8 decoration-gray-400";

	return (
		<div className="fixed top-4 left-0 right-0 w-full z-[1000] px-4">
			<div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] px-6 py-3 transition-all duration-300">
				<nav
					id="desktop-nav"
					className="hidden lg:flex justify-between items-center">
					<div className="text-xl cursor-default">
						<a
							href="#profile"
							className="transition-transform duration-300 hover:scale-105 block">
							<Image
								src="/assets/daynamikrihad.svg"
								alt="logo"
								width={96}
								height={40}
								className="w-24 logo-in h-auto"
								style={{ height: "auto" }}
								priority
							/>
						</a>
					</div>
					<ul className="flex gap-8 list-none text-xl nav-links">
						{["Home", "About", "Experience", "Projects", "Contact"].map(
							(item) => (
								<li key={item}>
									<a
										className={linkClass}
										href={`#${item.toLowerCase() === "home" ? "profile" : item.toLowerCase()}`}>
										{item}
									</a>
								</li>
							)
						)}
					</ul>
				</nav>
				<nav
					id="hamburger-nav"
					className="flex lg:hidden justify-between items-center relative">
					<div className="text-xl">
						<a href="#profile">
							<Image
								src="/assets/daynamikrihad.svg"
								alt="logo"
								width={80}
								height={32}
								className="w-20 logo-in h-auto"
								style={{ height: "auto" }}
							/>
						</a>
					</div>
					<div
						className="flex flex-col justify-between h-6 w-8 cursor-pointer z-50 group"
						onClick={toggleMenu}>
						<span
							className={`w-full h-0.5 bg-black transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[11px]" : ""}`}></span>
						<span
							className={`w-full h-0.5 bg-black transition-all duration-300 ${menuOpen ? "opacity-0" : "group-hover:translate-x-1"}`}></span>
						<span
							className={`w-full h-0.5 bg-black transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[11px]" : ""}`}></span>
					</div>
					<div
						className={`absolute top-[130%] left-0 right-0 mt-2 bg-white/80 backdrop-blur-lg border border-white/40 shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 origin-top flex flex-col items-center ${menuOpen ? "max-h-[400px] py-6 opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"}`}>
						{["Home", "About", "Experience", "Projects", "Contact"].map(
							(item) => (
								<li
									key={item}
									className="w-full text-center list-none group">
									<a
										className="block py-4 text-2xl text-black transition-colors duration-300 hover:bg-black/5"
										href={`#${item.toLowerCase() === "home" ? "profile" : item.toLowerCase()}`}
										onClick={toggleMenu}>
										{item}
									</a>
								</li>
							)
						)}
					</div>
				</nav>
			</div>
		</div>
	);
});

export default Navbar;
