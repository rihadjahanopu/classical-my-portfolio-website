"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
	const btnClass =
		"font-semibold transition-all duration-300 p-3 w-32 rounded-full border-2 border-[#353535] flex justify-center items-center cursor-pointer text-sm";

	return (
		<section
			id="profile"
			className="hero-wrapper flex flex-col lg:flex-row justify-center lg:gap-20 items-center min-h-screen pt-10 lg:pt-32 scroll-mt-32">
			<div className="flex w-75 h-75 sm:w-100 sm:h-100 lg:w-125 lg:h-125 perspective-[1000px] section__pic-container">
				<div className="w-full h-full relative cursor-pointer profile-in-co">
					<Image
						src="/assets/rihadprofile.jpg"
						alt="Rihad Jahan Opu"
						fill
						priority
						className="object-cover rounded-full"
						sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
					/>
				</div>
			</div>
			<div className="text-center mt-10 lg:mt-0 section__text">
				<p className="text-gray-600 font-semibold text-lg hero-p1">
					Hello, I'm
				</p>
				<h1 className="text-4xl lg:text-5xl font-bold text-black my-2 hero-title">
					Rihad Jahan Opu
				</h1>
				<p className="text-2xl text-gray-600 font-semibold mb-6 hero-p2">
					Full-Stack Web developer
				</p>
				<div className="flex flex-wrap justify-center gap-4 hero-btns">
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className={`${btnClass} hover:bg-[#353535] hover:border-[#353535] hover:text-white text-black bg-transparent`}
						onClick={() => window.open("/assets/Rihad Jahan Opu.pdf")}>
						Download CV
					</motion.button>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className={`${btnClass} bg-[#353535] text-white hover:bg-black hover:border-black`}
						onClick={() => (window.location.href = "/#contact")}>
						Contact Info
					</motion.button>
				</div>
				<div
					id="socials-container"
					className="flex justify-center gap-4 mt-8">
					<Image
						src="/assets/linkedin.png"
						alt="LinkedIn"
						width={32}
						height={32}
						className="cursor-pointer icon h-8 w-auto"
						onClick={() =>
							(window.location.href = "https://linkedin.com/in/rihadjahanopu")
						}
					/>
					<Image
						src="/assets/github.png"
						alt="Github"
						width={32}
						height={32}
						className="cursor-pointer icon h-8 w-auto"
						onClick={() =>
							(window.location.href = "https://github.com/rihadjahanopu")
						}
					/>

					<a
						href="/apk/Rihad.apk"
						download="Rihad.apk">
						<Image
							src="/assets/google-play.png"
							alt="Android App"
							width={32}
							height={32}
							className="cursor-pointer icon h-8 w-auto"
						/>
					</a>
				</div>

				<div className="mt-6">
					<Link
						className="text-sm text-gray-600 px-2 py-2 border rounded-full shadow-lg hover:text-white hover:bg-gray-950 hover:border-transparent"
						href={"mailto:rihad@rihadjahanopu.com"}>
						rihad@rihadjahanopu.com
					</Link>
				</div>
			</div>
		</section>
	);
}
