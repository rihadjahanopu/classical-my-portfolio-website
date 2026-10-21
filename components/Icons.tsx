"use client";

import React from "react";

interface IconProps {
	className?: string;
}

export function SearchIcon({ className = "w-4 h-4" }: IconProps) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true">
			<circle cx="11" cy="11" r="8" />
			<line x1="21" y1="21" x2="16.65" y2="16.65" />
		</svg>
	);
}

export function VolumeIcon({ className = "w-4 h-4" }: IconProps) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true">
			<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
			<path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
		</svg>
	);
}

export function VolumeMuteIcon({ className = "w-4 h-4" }: IconProps) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true">
			<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
			<line x1="23" y1="9" x2="17" y2="15" />
			<line x1="17" y1="9" x2="23" y2="15" />
		</svg>
	);
}

export function GithubIcon({ className = "w-5 h-5" }: IconProps) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
			/>
		</svg>
	);
}

export function LinkedinIcon({ className = "w-5 h-5" }: IconProps) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true">
			<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74V9.95H5.06v8.55h2.8z" />
		</svg>
	);
}

export function GooglePlayIcon({ className = "w-5 h-5" }: IconProps) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true">
			<path d="M3.609 1.814L13.793 12 3.61 22.186a1.868 1.868 0 0 1-.36-1.077V2.891c0-.404.13-.778.36-1.077zM15.207 13.414l2.586 2.586-12.756 7.365 10.17-9.951zm2.586-5.414l-2.586 2.586L5.037.635l12.756 7.365zM16.621 12l2.879-1.662a1.87 1.87 0 0 1 0 3.324L16.621 12z" />
		</svg>
	);
}

export function ChatGPTIcon({ className = "w-4 h-4" }: IconProps) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true">
			<path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 8.487a4.485 4.485 0 0 1 2.366-1.973V12.1a.766.766 0 0 0 .388.677l5.815 3.355-2.02 1.169a.076.076 0 0 1-.067 0L4.01 14.59a4.499 4.499 0 0 1-1.67-6.103zm16.597 3.855l-5.833-3.387L15.12 7.79a.076.076 0 0 1 .067 0l4.814 2.779a4.499 4.499 0 0 1-.689 8.212v-6.439a.789.789 0 0 0-.375-.68l-.04-.02zm2.01-4.238l-.142-.085-4.773-2.78a.776.776 0 0 0-.785 0L9.409 8.608V6.277a.088.088 0 0 1 .038-.063l4.817-2.78a4.5 4.5 0 0 1 6.674 4.674zM8.38 10.673l2.828-1.633a.08.08 0 0 1 .076 0l2.828 1.633a.08.08 0 0 1 .038.066v3.265a.08.08 0 0 1-.038.066l-2.828 1.633a.08.08 0 0 1-.076 0L8.38 14.07a.08.08 0 0 1-.038-.066V10.74a.08.08 0 0 1 .038-.067z" />
		</svg>
	);
}

export function ClaudeIcon({ className = "w-4 h-4" }: IconProps) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true">
			<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5h-2v-2h2zm0-4h-2V7h2z" opacity="0.3" />
			<path d="M12 4a8 8 0 1 0 8 8 8.01 8.01 0 0 0-8-8zm1.2 12.8h-2.4v-2.4h2.4zm0-4.8h-2.4V6.4h2.4z" />
		</svg>
	);
}

export function RustIcon({ className = "w-5 h-5" }: IconProps) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true">
			<path d="M22.04 11.23l-.93-.32a9.58 9.58 0 0 0-.47-1.14l.65-.75a.5.5 0 0 0-.08-.72l-1.06-.82a.5.5 0 0 0-.71.1l-.64.76c-.4-.2-.82-.37-1.25-.5l.12-.99a.5.5 0 0 0-.44-.55l-1.33-.16a.5.5 0 0 0-.55.44l-.12.98c-.44.05-.87.14-1.29.27l-.42-.9a.5.5 0 0 0-.67-.25l-1.22.56a.5.5 0 0 0-.25.67l.42.9a9.66 9.66 0 0 0-1.12.63l-.78-.62a.5.5 0 0 0-.72.07l-.83 1.05a.5.5 0 0 0 .07.72l.77.63c-.27.35-.5.73-.69 1.13l-.97-.2a.5.5 0 0 0-.58.39l-.27 1.31a.5.5 0 0 0 .39.58l.97.2c-.06.44-.08.89-.06 1.34l-.94.33a.5.5 0 0 0-.31.63l.44 1.27a.5.5 0 0 0 .63.31l.94-.33c.18.41.4.8.65 1.17l-.59.8a.5.5 0 0 0 .1.7l1.07.8a.5.5 0 0 0 .7-.1l.59-.8c.38.23.78.43 1.2.58l-.16.98a.5.5 0 0 0 .41.57l1.32.21a.5.5 0 0 0 .57-.41l.16-.98c.45-.02.9-.08 1.33-.19l.36.93a.5.5 0 0 0 .65.29l1.24-.49a.5.5 0 0 0 .29-.65l-.36-.93c.39-.17.76-.38 1.11-.63l.74.67a.5.5 0 0 0 .72-.04l.89-1a.5.5 0 0 0-.04-.72l-.74-.67c.29-.33.54-.7.75-1.08l.98.15a.5.5 0 0 0 .56-.41l.21-1.33a.5.5 0 0 0-.41-.56l-.98-.15c.08-.43.12-.88.11-1.33l.93-.32a.5.5 0 0 0 .32-.63l-.42-1.28a.5.5 0 0 0-.63-.32zm-10.04 6.77c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm1.5-7.5h-3v-1.5h3v1.5zm0 3h-3v-1.5h3v1.5z" />
		</svg>
	);
}

export function CopyIcon({ className = "w-4 h-4" }: IconProps) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true">
			<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
			<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
		</svg>
	);
}

export function MailIcon({ className = "w-4 h-4" }: IconProps) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true">
			<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
			<polyline points="22,6 12,13 2,6" />
		</svg>
	);
}

export function PhoneIcon({ className = "w-4 h-4" }: IconProps) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true">
			<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
		</svg>
	);
}

export function BriefcaseIcon({ className = "w-5 h-5" }: IconProps) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true">
			<rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
			<path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
		</svg>
	);
}

export function AcademicCapIcon({ className = "w-5 h-5" }: IconProps) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true">
			<path d="M22 10v6M2 10l10-5 10 5-10 5z" />
			<path d="M6 12v5c3 3 9 3 12 0v-5" />
		</svg>
	);
}

export function BoltIcon({ className = "w-4 h-4" }: IconProps) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true">
			<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
		</svg>
	);
}

export function ExternalLinkIcon({ className = "w-3.5 h-3.5" }: IconProps) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2.5}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true">
			<line x1="7" y1="17" x2="17" y2="7" />
			<polyline points="7 7 17 7 17 17" />
		</svg>
	);
}

export function ArrowUpIcon({ className = "w-3.5 h-3.5" }: IconProps) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2.5}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true">
			<line x1="12" y1="19" x2="12" y2="5" />
			<polyline points="5 12 12 5 19 12" />
		</svg>
	);
}

export function GlobeIcon({ className = "w-4 h-4" }: IconProps) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true">
			<circle cx="12" cy="12" r="10" />
			<line x1="2" y1="12" x2="22" y2="12" />
			<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
		</svg>
	);
}

export function BotIcon({ className = "w-4 h-4" }: IconProps) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true">
			<rect x="3" y="11" width="18" height="10" rx="2" />
			<circle cx="12" cy="5" r="2" />
			<path d="M12 7v4" />
			<line x1="8" y1="16" x2="8.01" y2="16" />
			<line x1="16" y1="16" x2="16.01" y2="16" />
		</svg>
	);
}

