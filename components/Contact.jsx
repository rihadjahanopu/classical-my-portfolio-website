"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Contact() {
	const fadeInUp = {
		hidden: { opacity: 0, y: 40 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
		},
	};

	return (
		<motion.section
			id="contact"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.5 }}
			variants={fadeInUp}
			className="scroll-mt-32 pt-20 pb-20">
			<p className="text-center text-gray-600 font-semibold">Get in Touch</p>
			<h2 className="text-4xl md:text-5xl text-center font-bold mb-10 title">
				Contact Me
			</h2>
			<div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full max-w-4xl mx-auto px-4">
				<motion.div
					whileHover={{ scale: 1.02, translateY: -5 }}
					whileTap={{ scale: 0.98 }}
					className="flex items-center gap-4 cursor-pointer group bg-white border border-gray-200 rounded-2xl py-4 px-6 shadow-sm hover:shadow-md transition-all duration-300 w-full md:w-auto"
					onClick={() => (window.location.href = "mailto:itrihad@gmail.com")}>
					<div className="bg-gray-50 p-2 rounded-xl border border-gray-100 group-hover:bg-blue-50 transition-colors duration-300">
						<Image
							src="/assets/email.png"
							alt="Email"
							width={32}
							height={32}
							className="h-6 w-6 md:h-8 md:w-8 object-contain"
						/>
					</div>
					<p className="text-base md:text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
						itrihad@gmail.com
					</p>
				</motion.div>

				<motion.div
					whileHover={{ scale: 1.02, translateY: -5 }}
					whileTap={{ scale: 0.98 }}
					className="flex items-center gap-4 cursor-pointer group bg-white border border-gray-200 rounded-2xl py-4 px-6 shadow-sm hover:shadow-md transition-all duration-300 w-full md:w-auto"
					onClick={() =>
						window.open("https://www.linkedin.com/in/rihadjahanopu")
					}>
					<div className="bg-gray-50 p-2 rounded-xl border border-gray-100 group-hover:bg-blue-50 transition-colors duration-300">
						<Image
							src="/assets/linkedin.png"
							alt="LinkedIn"
							width={32}
							height={32}
							className="h-6 w-6 md:h-8 md:w-8 object-contain"
						/>
					</div>
					<p className="text-base md:text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
						LinkedIn
					</p>
				</motion.div>
			</div>
		</motion.section>
	);
}
