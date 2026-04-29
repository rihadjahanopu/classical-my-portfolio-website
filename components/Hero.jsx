"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

export default function Hero({ heroY, heroOpacity }) {
	const btnClass =
		"font-semibold transition-all duration-300 p-3 w-32 rounded-full border-2 border-[#353535] flex justify-center items-center cursor-pointer text-sm";

	return (
		<motion.section
			id="profile"
			style={{
				y: heroY,
				opacity: heroOpacity,
			}}
			className="flex flex-col lg:flex-row justify-center lg:gap-20 items-center min-h-screen pt-10 lg:pt-32 scroll-mt-32">
			<motion.div className="flex w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] perspective-[1000px] section__pic-container">
				<motion.div className="w-full h-full relative cursor-pointer profile-in-co">
					<Image
						src="/assets/rihadprofile.jpg"
						alt="Rihad Jahan Opu"
						fill
						priority
						className="object-cover rounded-full"
						sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
					/>
				</motion.div>
			</motion.div>
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
			</div>
		</motion.section>
	);
}

