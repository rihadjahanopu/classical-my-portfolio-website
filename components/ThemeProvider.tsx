"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type ThemeId =
	| "tokyo-night"
	| "catppuccin"
	| "dracula"
	| "matrix"
	| "nord"
	| "clean-light";

export interface ThemeOption {
	id: ThemeId;
	name: string;
	color: string;
	bg: string;
}

export const AVAILABLE_THEMES: ThemeOption[] = [
	{ id: "tokyo-night", name: "Tokyo Night", color: "#7aa2f7", bg: "#0f111a" },
	{ id: "catppuccin", name: "Catppuccin Mocha", color: "#cba6f7", bg: "#181825" },
	{ id: "dracula", name: "Dracula", color: "#bd93f9", bg: "#1e1f29" },
	{ id: "matrix", name: "Matrix Hacker", color: "#22c55e", bg: "#050805" },
	{ id: "nord", name: "Nord Arctic", color: "#88c0d0", bg: "#242933" },
	{ id: "clean-light", name: "Clean Classic", color: "#2563eb", bg: "#fafafa" },
];

interface ThemeContextType {
	theme: ThemeId;
	setTheme: (theme: ThemeId) => void;
	soundEnabled: boolean;
	toggleSound: () => void;
	playClick: () => void;
	toastMessage: string | null;
	showToast: (msg: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
	theme: "tokyo-night",
	setTheme: () => {},
	soundEnabled: false,
	toggleSound: () => {},
	playClick: () => {},
	toastMessage: null,
	showToast: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setThemeState] = useState<ThemeId>("tokyo-night");
	const [soundEnabled, setSoundEnabled] = useState(false);
	const [toastMessage, setToastMessage] = useState<string | null>(null);

	// Load preferences from localStorage on mount
	useEffect(() => {
		try {
			const savedTheme = localStorage.getItem("preferred-theme") as ThemeId;
			if (savedTheme && AVAILABLE_THEMES.some((t) => t.id === savedTheme)) {
				setThemeState(savedTheme);
			}
			const savedSound = localStorage.getItem("preferred-sound");
			if (savedSound !== null) {
				setSoundEnabled(savedSound === "true");
			}
		} catch {}
	}, []);

	// Apply data-theme attribute on <html> element and update body background
	useEffect(() => {
		const themeObj = AVAILABLE_THEMES.find((t) => t.id === theme) || AVAILABLE_THEMES[0];
		document.documentElement.setAttribute("data-theme", theme);

		if (theme === "clean-light") {
			document.documentElement.classList.remove("dark");
		} else {
			document.documentElement.classList.add("dark");
		}

		// Ensure direct body background is applied immediately (bulletproof fallback)
		if (document.body) {
			document.body.style.backgroundColor = themeObj.bg;
		}

		// Update mobile meta theme-color
		const metaTheme = document.querySelector('meta[name="theme-color"]');
		if (metaTheme) {
			metaTheme.setAttribute("content", themeObj.bg);
		}

		try {
			localStorage.setItem("preferred-theme", theme);
		} catch {}
	}, [theme]);

	const setTheme = useCallback((newTheme: ThemeId) => {
		setThemeState(newTheme);
	}, []);

	const toggleSound = useCallback(() => {
		setSoundEnabled((prev) => {
			const next = !prev;
			try {
				localStorage.setItem("preferred-sound", String(next));
			} catch {}
			return next;
		});
	}, []);

	// Synthetic Web Audio Click (Zero bundle weight, zero audio file fetch latency)
	const playClick = useCallback(() => {
		if (!soundEnabled || typeof window === "undefined") return;
		try {
			const AudioContextClass =
				window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
			const ctx = new AudioContextClass();
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();

			osc.type = "sine";
			osc.frequency.setValueAtTime(900, ctx.currentTime);
			osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.035);

			gain.gain.setValueAtTime(0.06, ctx.currentTime);
			gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

			osc.connect(gain);
			gain.connect(ctx.destination);

			osc.start();
			osc.stop(ctx.currentTime + 0.035);
		} catch {}
	}, [soundEnabled]);

	const showToast = useCallback((msg: string) => {
		setToastMessage(msg);
		setTimeout(() => {
			setToastMessage((cur) => (cur === msg ? null : cur));
		}, 3000);
	}, []);

	return (
		<ThemeContext.Provider
			value={{
				theme,
				setTheme,
				soundEnabled,
				toggleSound,
				playClick,
				toastMessage,
				showToast,
			}}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}