"use client";

import { useEffect, useState } from "react";

export default function AmbientSpotlight() {
	const [pos, setPos] = useState({ x: -1000, y: -1000 });
	const [isPointerDevice, setIsPointerDevice] = useState(false);

	useEffect(() => {
		// Detect if device supports precise mouse hover
		const hasPointer = window.matchMedia("(pointer: fine)").matches;
		setIsPointerDevice(hasPointer);

		if (!hasPointer) return;

		const handleMouseMove = (e: MouseEvent) => {
			setPos({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener("pointermove", handleMouseMove, { passive: true });
		return () => window.removeEventListener("pointermove", handleMouseMove);
	}, []);

	if (!isPointerDevice) {
		// Static top glow for touch/mobile devices
		return (
			<div
				className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden"
				aria-hidden="true">
				<div
					className="absolute -top-40 left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full blur-[120px] opacity-25"
					style={{ background: "var(--accent-glow)" }}
				/>
			</div>
		);
	}

	return (
		<div
			className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden transition-opacity duration-500"
			aria-hidden="true">
			<div
				className="absolute inset-0 will-change-transform"
				style={{
					background: `radial-gradient(750px circle at ${pos.x}px ${pos.y}px, var(--accent-glow), transparent 70%)`,
				}}
			/>
		</div>
	);
}

