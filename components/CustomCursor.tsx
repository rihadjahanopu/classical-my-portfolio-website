"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Modern Custom Cursor Component
 * - Dual-layer precision dot + fluid trailing outer ring
 * - GPU-accelerated requestAnimationFrame lerp (zero React rerenders on mousemove)
 * - Dynamic reactive scaling on interactive elements (buttons, links, cards)
 * - Mechanical snap feel on mousedown / click
 * - 100% disabled on touch / mobile devices for zero interference
 * - Adapts dynamically to active CSS theme variables (--accent-primary, --accent-glow)
 */
export default function CustomCursor() {
	const dotRef = useRef<HTMLDivElement>(null);
	const ringRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [isEnabled, setIsEnabled] = useState(false);

	useEffect(() => {
		// Strict check: Only activate if device has a fine pointer (mouse / trackpad) and hover capability
		const hasFinePointer =
			typeof window !== "undefined" &&
			window.matchMedia("(pointer: fine) and (hover: hover)").matches;

		if (!hasFinePointer) return;

		// Check if it's purely a touchscreen device
		const isTouchDevice =
			"ontouchstart" in window ||
			navigator.maxTouchPoints > 0 ||
			window.matchMedia("(pointer: coarse)").matches;

		if (isTouchDevice && !window.matchMedia("(pointer: fine)").matches) return;

		setIsEnabled(true);
		document.documentElement.classList.add("has-custom-cursor");

		let mouseX = -100;
		let mouseY = -100;
		let ringX = -100;
		let ringY = -100;
		let isHovered = false;
		let isClicked = false;
		let isHidden = true;
		let isInput = false;
		let rafId: number;

		const onMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = e.clientY;

			if (isHidden) {
				isHidden = false;
				setIsVisible(true);
			}

			// Interactive target check
			const target = e.target as HTMLElement | null;
			if (target) {
				const interactive = target.closest(
					"a, button, [role='button'], input, textarea, select, .cursor-pointer, [data-cursor-hover], .project-card, .nav-links li"
				);
				isHovered = !!interactive;

				const inputEl = target.closest("input, textarea, [contenteditable='true']");
				isInput = !!inputEl;
			}
		};

		const onMouseDown = () => {
			isClicked = true;
		};

		const onMouseUp = () => {
			isClicked = false;
		};

		const onMouseLeave = () => {
			isHidden = true;
			setIsVisible(false);
		};

		const onMouseEnter = () => {
			isHidden = false;
			setIsVisible(true);
		};

		const onTouchStart = () => {
			// Hybrid touchscreen tap: immediately hide custom cursor
			setIsEnabled(false);
			document.documentElement.classList.remove("has-custom-cursor");
		};

		// 60-120fps Animation Loop using linear interpolation (lerp)
		const render = () => {
			const dot = dotRef.current;
			const ring = ringRef.current;

			if (dot && ring) {
				// Inner precision dot follows pointer instantly
				const dotScale = isClicked ? 0.75 : isHovered ? (isInput ? 0.4 : 1.4) : 1;
				dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${dotScale})`;

				// Outer fluid ring follows with smooth spring lag
				ringX += (mouseX - ringX) * 0.18;
				ringY += (mouseY - ringY) * 0.18;

				const ringScale = isInput
					? 0.5
					: isClicked
					? 0.8
					: isHovered
					? 1.55
					: 1;

				ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;

				if (isHovered && !isInput) {
					ring.style.backgroundColor = "var(--accent-glow)";
					ring.style.borderColor = "var(--accent-primary)";
					ring.style.backdropFilter = "blur(2px)";
				} else {
					ring.style.backgroundColor = "transparent";
					ring.style.borderColor = "var(--accent-primary)";
					ring.style.backdropFilter = "none";
				}

				if (isInput) {
					ring.style.opacity = "0.3";
					dot.style.opacity = "0.4";
				} else {
					ring.style.opacity = "1";
					dot.style.opacity = "1";
				}
			}

			rafId = requestAnimationFrame(render);
		};

		window.addEventListener("mousemove", onMouseMove, { passive: true });
		window.addEventListener("mousedown", onMouseDown);
		window.addEventListener("mouseup", onMouseUp);
		document.addEventListener("mouseleave", onMouseLeave);
		document.addEventListener("mouseenter", onMouseEnter);
		window.addEventListener("touchstart", onTouchStart, { passive: true, once: true });

		rafId = requestAnimationFrame(render);

		return () => {
			cancelAnimationFrame(rafId);
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mousedown", onMouseDown);
			window.removeEventListener("mouseup", onMouseUp);
			document.removeEventListener("mouseleave", onMouseLeave);
			document.removeEventListener("mouseenter", onMouseEnter);
			window.removeEventListener("touchstart", onTouchStart);
			document.documentElement.classList.remove("has-custom-cursor");
		};
	}, []);

	if (!isEnabled) return null;

	return (
		<div
			className={`fixed inset-0 pointer-events-none z-[9999999] transition-opacity duration-300 ${
				isVisible ? "opacity-100" : "opacity-0"
			}`}
			aria-hidden="true">
			{/* Fluid Magnetic Outer Ring */}
			<div
				ref={ringRef}
				className="fixed top-0 left-0 w-9 h-9 rounded-full border border-[var(--accent-primary)] pointer-events-none will-change-transform transition-[background-color,border-color,opacity,backdrop-filter] duration-200"
				style={{
					boxShadow: "0 0 16px var(--accent-glow)",
				}}
			/>

			{/* Precision Inner Dot */}
			<div
				ref={dotRef}
				className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--accent-primary)] pointer-events-none will-change-transform transition-transform duration-100"
				style={{
					boxShadow: "0 0 10px var(--accent-primary)",
				}}
			/>
		</div>
	);
}

