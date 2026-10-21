import Link from "next/link";
import Projects from "../../components/Projects";
import { Magnetic } from "../../components/MagneticButton";

export const metadata = {
	title: "Projects | Rihad Jahan Opu",
	description: "Explore open-source systems software, pure Rust shells, and full-stack web applications by Rihad Jahan Opu.",
};

export default function ProjectsPage() {
	return (
		<main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-12 pb-16 px-4">
			<div className="max-w-6xl mx-auto mb-4">
				<Magnetic strength={0.25}>
					<Link
						href="/#profile"
						className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-black dark:hover:text-white transition-colors">
						← Back to Home
					</Link>
				</Magnetic>
			</div>
			<Projects />
		</main>
	);
}