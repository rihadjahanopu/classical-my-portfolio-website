"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01X$%";

interface TextScrambleProps {
	text: string;
	className?: string;
	triggerOnHover?: boolean;
}

export default function TextScramble({
	text,
	className = "",
	triggerOnHover = true,
}: TextScrambleProps) {
	const [displayText, setDisplayText] = useState(text);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const scramble = useCallback(() => {
		let iteration = 0;
		if (intervalRef.current) clearInterval(intervalRef.current);

		intervalRef.current = setInterval(() => {
			setDisplayText(() =>
				text
					.split("")
					.map((char, index) => {
						if (char === " ") return " ";
						if (index < iteration) {
							return text[index];
						}
						return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
					})
					.join("")
			);

			if (iteration >= text.length) {
				if (intervalRef.current) clearInterval(intervalRef.current);
			}

			iteration += 1 / 2;
		}, 30);
	}, [text]);

	useEffect(() => {
		scramble();
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [scramble]);

	return (
		<span
			className={`inline-block ${className}`}
			onMouseEnter={triggerOnHover ? scramble : undefined}>
			{displayText}
		</span>
	);
}

