"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Preloader({ isLoading }) {
	return (
		<AnimatePresence>
			{isLoading && (
				<motion.div
					key="loader"
					className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center pointer-events-auto"
					exit={{
						opacity: 0,
						y: "-100%",
						transition: {
							y: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
							opacity: { duration: 0.4, delay: 0.4 },
						},
					}}
					style={{ pointerEvents: isLoading ? "auto" : "none" }}>
					<Image
						src="/assets/daynamikrihad.svg"
						alt="Loading logo"
						width={400}
						height={100}
						className="w-64 md:w-96 mb-12 h-auto"
						style={{ height: "auto" }}
						priority
					/>
					<motion.div className="flex gap-1">
						{["L", "O", "A", "D", "I", "N", "G", ".", ".", "."].map(
							(letter, i) => (
								<motion.span
									key={i}
									className="font-bold text-lg tracking-[2px] text-gray-800"
									initial={{ y: 0 }}
									animate={{ y: [-10, 0, 0] }}
									transition={{
										duration: 1,
										repeat: Infinity,
										delay: i * 0.1,
									}}>
									{letter}
								</motion.span>
							)
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
