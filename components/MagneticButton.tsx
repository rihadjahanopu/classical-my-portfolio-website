"use client";

import { motion } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

interface MagneticProps {
	children: React.ReactNode;
	className?: string;
	strength?: number;
}

/**
 * Universal Magnetic Wrapper Component
 * Smoothly pulls any wrapped button, link, or icon toward the mouse cursor with spring physics.
 * Automatically bypassed on mobile/touch devices.
 */
export function Magnetic({
	children,
	className = "",
	strength = 0.35,
}: MagneticProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isPointer, setIsPointer] = useState(false);

	useEffect(() => {
		setIsPointer(
			typeof window !== "undefined" &&
			window.matchMedia("(pointer: fine) and (hover: hover)").matches
		);
	}, []);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isPointer || !ref.current) return;
		const { left, top, width, height } = ref.current.getBoundingClientRect();
		const middleX = left + width / 2;
		const middleY = top + height / 2;
		const offsetX = (e.clientX - middleX) * strength;
		const offsetY = (e.clientY - middleY) * strength;
		setPosition({ x: offsetX, y: offsetY });
	};

	const handleMouseLeave = () => {
		setPosition({ x: 0, y: 0 });
	};

	if (!isPointer) {
		return <>{children}</>;
	}

	return (
		<motion.div
			ref={ref}
			className={`inline-block ${className}`}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			animate={{ x: position.x, y: position.y }}
			transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.1 }}>
			{children}
		</motion.div>
	);
}

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	className?: string;
	strength?: number;
}

export default function MagneticButton({
	children,
	className = "",
	strength = 0.35,
	onClick,
	...props
}: MagneticButtonProps) {
	const { playClick } = useTheme();

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		playClick();
		if (onClick) onClick(e);
	};

	return (
		<Magnetic strength={strength}>
			<button
				className={className}
				onClick={handleClick}
				{...props}>
				{children}
			</button>
		</Magnetic>
	);
}
