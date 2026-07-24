"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

// এখানে আপনার কন্টাক্ট ইনফরমেশনগুলো সাজানো হয়েছে
const contactData = [
	{
		id: 1,
		title: "rihad@rihadjahanopu.com",
		icon: "/assets/email.png",
		alt: "Email",
		action: () => (window.location.href = "mailto:rihad@rihadjahanopu.com"),
	},
	{
		id: 2,
		title: "LinkedIn",
		icon: "/assets/linkedin.png",
		alt: "LinkedIn",
		action: () =>
			window.open("https://www.linkedin.com/in/rihadjahanopu", "_blank"),
	},
	{
		id: 3,
		title: "+8801616151573", // এখানে আপনার আসল নাম্বারটি বসিয়ে দিন
		icon: "/assets/phone.png", // assets ফোল্ডারে phone.png নামে একটি আইকন রেখে দিন
		alt: "Phone",
		action: () => (window.location.href = "tel:+8801XXXXXXXXX"), // এখানেও আসল নাম্বারটি দিন (কোনো স্পেস ছাড়া)
	},
];

export default function Contact() {
	const fadeInUp: Variants = {
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

			{/* flex-wrap যোগ করা হয়েছে যাতে ৩টা কার্ড স্ক্রিন অনুযায়ী সুন্দরভাবে বসে */}
			<div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 w-full max-w-5xl mx-auto px-4">
				{contactData.map((item) => (
					<motion.div
						key={item.id}
						whileHover={{ scale: 1.02, translateY: -5 }}
						whileTap={{ scale: 0.98 }}
						className="flex items-center gap-4 cursor-pointer group bg-white border border-gray-200 rounded-2xl py-4 px-6 shadow-sm hover:shadow-md transition-all duration-300 w-full md:w-auto"
						onClick={item.action}>
						<div className="bg-gray-50 p-2 rounded-xl border border-gray-100 group-hover:bg-blue-50 transition-colors duration-300">
							<Image
								src={item.icon}
								alt={item.alt}
								width={32}
								height={32}
								className="h-6 w-6 md:h-8 md:w-8 object-contain"
							/>
						</div>
						<p className="text-base md:text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
							{item.title}
						</p>
					</motion.div>
				))}
			</div>
		</motion.section>
	);
}
