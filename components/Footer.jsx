"use client";

import Image from "next/image";

export default function Footer() {
	const linkClass =
		"text-black no-underline transition-all duration-300 hover:text-gray-500 hover:underline hover:underline-offset-8 decoration-gray-400";

	return (
		<footer className="py-12 md:h-48 flex flex-col justify-center items-center bg-white/30 backdrop-blur-sm mt-10">
			<nav className="mb-8 flex flex-col items-center gap-8">
				<a
					href="#profile"
					className="transition-transform duration-300 hover:scale-110">
							<Image
								src="/assets/daynamikrihad.svg"
								alt="Logo"
								width={192}
								height={64}
								className="w-64 md:w-80 h-auto"
								style={{ height: "auto" }}
							/>
				</a>
				<ul className="flex flex-wrap justify-center gap-6 md:gap-12 list-none text-lg md:text-xl">
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
			<p className="text-center text-gray-500 text-sm md:text-base px-4">
				Copyright &#169; {new Date().getFullYear()} Rihad Jahan Opu. All Rights Reserved.
			</p>
		</footer>
	);
}
