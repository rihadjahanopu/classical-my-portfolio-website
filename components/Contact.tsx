"use client";

import { memo } from "react";
import { motion, Variants } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Magnetic } from "./MagneticButton";
import {
	MailIcon,
	LinkedinIcon,
	PhoneIcon,
	CopyIcon,
	ExternalLinkIcon,
} from "./Icons";

interface ContactItem {
	id: number;
	label: string;
	value: string;
	displayValue: string;
	icon: React.ReactNode;
	badge?: string;
	actionType: "email" | "link" | "phone";
	href: string;
}

const contactList: ContactItem[] = [
	{
		id: 1,
		label: "Email Address",
		value: "rihad@rihadjahanopu.com",
		displayValue: "rihad@rihadjahanopu.com",
		icon: <MailIcon className="w-6 h-6 text-emerald-500" />,
		badge: "Fastest Response",
		actionType: "email",
		href: "mailto:rihad@rihadjahanopu.com",
	},
	{
		id: 2,
		label: "LinkedIn Profile",
		value: "https://www.linkedin.com/in/rihadjahanopu",
		displayValue: "in/rihadjahanopu",
		icon: <LinkedinIcon className="w-6 h-6 text-[#0a66c2] dark:text-[#38bdf8]" />,
		badge: "Professional Network",
		actionType: "link",
		href: "https://www.linkedin.com/in/rihadjahanopu",
	},
	{
		id: 3,
		label: "Direct Phone & WhatsApp",
		value: "+8801616151573",
		displayValue: "+880 1616-151573",
		icon: <PhoneIcon className="w-6 h-6 text-amber-500" />,
		badge: "Direct Line",
		actionType: "phone",
		href: "tel:+8801616151573",
	},
];

const Contact = memo(function Contact() {
	const { playClick, showToast } = useTheme();

	const fadeInUp: Variants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
		},
	};

	const handleCopy = (item: ContactItem) => {
		playClick();
		navigator.clipboard.writeText(item.value);
		showToast(`Copied ${item.label} to clipboard!`);
	};

	return (
		<motion.section
			id="contact"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
			variants={fadeInUp}
			className="scroll-mt-32 pt-20 pb-20 w-full">
			{/* Section Header */}
			<div className="text-center mb-10">
				<p className="text-sm font-mono uppercase tracking-wider text-[var(--text-muted)]">
					🤝 Let&apos;s Build Something High-Impact
				</p>
				<h2 className="text-4xl md:text-5xl font-bold tracking-tight title text-[var(--text-primary)] mt-1">
					Get in Touch 📬
				</h2>
				<p className="text-sm text-[var(--text-secondary)] mt-2 max-w-xl mx-auto">
					Open for full-time engineering roles, high-performance systems consulting, and select contract projects.
				</p>
			</div>

			{/* Contact Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10">
				{contactList.map((item) => (
					<motion.div
						key={item.id}
						whileHover={{ translateY: -4 }}
						className="group relative bg-[var(--bg-card)]/80 backdrop-blur-md border border-[var(--border-color)] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
						<div>
							{/* Card Header with Icon & Badge */}
							<div className="flex items-center justify-between mb-4">
								<span className="text-2xl p-2.5 rounded-2xl bg-white/5 border border-[var(--border-color)]">
									{item.icon}
								</span>
								{item.badge && (
									<span className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20">
										{item.badge}
									</span>
								)}
							</div>

							<span className="text-xs font-mono text-[var(--text-muted)]">
								{item.label}
							</span>
							<p className="text-base sm:text-lg font-bold text-[var(--text-primary)] mt-0.5 break-all">
								{item.displayValue}
							</p>
						</div>

						{/* Action Buttons: Copy & Open */}
						<div className="grid grid-cols-2 gap-2 mt-5 sm:mt-6 pt-4 border-t border-gray-100 dark:border-white/5">
							<Magnetic strength={0.25} className="w-full">
								<button
									onClick={() => handleCopy(item)}
									className="w-full py-2 px-3 rounded-xl text-xs font-medium border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
									<CopyIcon className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
									<span>Copy</span>
								</button>
							</Magnetic>

							<Magnetic strength={0.25} className="w-full">
								<a
									href={item.href}
									target={item.actionType === "link" ? "_blank" : undefined}
									rel={item.actionType === "link" ? "noopener noreferrer" : undefined}
									onClick={playClick}
									className="w-full py-2 px-3 rounded-xl text-xs font-medium bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 text-center cursor-pointer">
									<span>{item.actionType === "link" ? "Visit" : "Open"}</span>
									<ExternalLinkIcon className="w-3 h-3" />
								</a>
							</Magnetic>
						</div>
					</motion.div>
				))}
			</div>

			{/* Availability Status Banner (Full-width matching contact cards grid) */}
			<div className="max-w-5xl mx-auto w-full p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-[var(--bg-card)]/80 border border-[var(--border-color)] backdrop-blur-md shadow-xs">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4 items-center text-[11px] sm:text-xs md:text-sm font-mono">
					{/* Status */}
					<div className="flex items-center justify-center md:justify-start gap-2 text-[var(--text-primary)] font-medium text-center">
						<span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
							<span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500" />
						</span>
						<span className="whitespace-nowrap">
							<span className="hidden sm:inline">Active & </span>Available for new projects
						</span>
					</div>

					{/* Location */}
					<div className="flex items-center justify-center gap-1.5 text-[var(--text-secondary)]">
						<span>📍</span>
						<span className="whitespace-nowrap">Sylhet, BD (GMT+6)</span>
					</div>

					{/* Response speed */}
					<div className="flex items-center justify-center md:justify-end gap-1.5 text-emerald-500 dark:text-emerald-400 font-medium">
						<span>⚡</span>
						<span className="whitespace-nowrap">Response within 2h</span>
					</div>
				</div>
			</div>
		</motion.section>
	);
});

export default Contact;