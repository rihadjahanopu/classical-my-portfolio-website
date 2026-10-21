import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsData } from "../data";
import { Magnetic } from "../../../components/MagneticButton";

// ১. স্ট্যাটিক পেজ জেনারেট করতে
export function generateStaticParams() {
	return projectsData.map((project) => ({
		id: project.id.toString(),
	}));
}

// ২. মেটাডাটা (async এবং await params ব্যবহার করা হয়েছে)
export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const project = projectsData.find((p) => p.id.toString() === id);
	if (!project) return { title: "Project Not Found" };

	const title = `${project.title} | ${project.isOpenSource ? "Open Source " : ""}Project`;
	const description = project.description;

	return {
		title,
		description,
		keywords: [
			project.title,
			...project.techStack,
			project.isOpenSource ? "Open Source" : "",
			"Rihad Jahan Opu",
			"Software Engineering",
		].filter(Boolean),
		openGraph: {
			title,
			description,
			url: `https://www.rihadjahanopu.com/projects/${project.id}`,
			siteName: "Rihad Jahan Opu Portfolio",
			images: [
				{
					url: project.image,
					width: 1200,
					height: 630,
					alt: project.imageAlt || project.title,
				},
			],
			type: "article",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [project.image],
			creator: "@rihadjahanopu",
		},
		alternates: {
			canonical: `https://www.rihadjahanopu.com/projects/${project.id}`,
		},
	};
}

// ৩. মেইন কম্পোনেন্ট (async এবং await params ব্যবহার করা হয়েছে)
export default async function ProjectDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const project = projectsData.find((p) => p.id.toString() === id);

	if (!project) {
		notFound();
	}

	const btnClass =
		"font-semibold transition-all duration-300 px-6 py-2.5 rounded-full border border-gray-300 dark:border-white/20 flex justify-center items-center text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black";

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": project.isOpenSource ? "SoftwareSourceCode" : "SoftwareApplication",
		name: project.title,
		description: project.description,
		image: project.image,
		codeRepository: project.github,
		installUrl: project.liveDemo,
		programmingLanguage: project.techStack,
		author: {
			"@type": "Person",
			name: "Rihad Jahan Opu",
			url: "https://www.rihadjahanopu.com",
		},
	};

	return (
		<main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-20 pb-16 px-4">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<div className="max-w-4xl mx-auto">
				{/* Back Button */}
				<Magnetic strength={0.25}>
					<Link
						href="/#projects"
						className="inline-flex items-center gap-2 text-gray-500 hover:text-black dark:hover:text-white mb-8 transition-colors font-mono text-sm">
						← Back to Portfolio
					</Link>
				</Magnetic>

				<div className="flex flex-wrap items-center gap-3 mb-6">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
						{project.title}
					</h1>
					{project.isOpenSource && (
						<span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold px-3 py-1 rounded-full border border-emerald-500/30">
							Open Source
						</span>
					)}
					{project.license && (
						<span className="bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-sm font-mono px-3 py-1 rounded-full border border-gray-200 dark:border-white/10">
							{project.license}
						</span>
					)}
				</div>

				{/* Hero Image */}
				<div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-8 border border-gray-200 dark:border-white/10 shadow-lg">
					<Image
						src={project.image}
						alt={project.imageAlt || `${project.title} Preview`}
						fill
						className="object-cover"
						priority
					/>
				</div>

				{/* Description */}
				<p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
					{project.description}
				</p>

				{/* Highlights */}
				{project.highlights && project.highlights.length > 0 && (
					<div className="mb-8 p-6 bg-white/70 dark:bg-[#12131d]/70 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-3xl">
						<h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-4 font-mono">
							Performance & Architecture Benchmarks
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							{project.highlights.map((item, index) => (
								<div
									key={index}
									className="flex items-start gap-2.5 text-sm font-medium text-gray-800 dark:text-gray-200 bg-white dark:bg-white/5 p-3 rounded-2xl border border-gray-200/50 dark:border-white/10">
									<span className="text-emerald-500 font-bold text-base leading-none">✓</span>
									<span>{item}</span>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Tech Stack */}
				<div className="mb-8">
					<h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
						Technologies Used
					</h2>
					<div className="flex flex-wrap gap-2">
						{project.techStack.map((tech, index) => (
							<span
								key={index}
								className="bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-200 text-sm font-mono px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/10">
								{tech}
							</span>
						))}
					</div>
				</div>

				{/* Features */}
				{project.features && project.features.length > 0 && (
					<div className="mb-8">
						<h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
							Key Features & Capabilities
						</h2>
						<ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
							{project.features.map((feature, index) => (
								<li key={index} className="leading-relaxed">
									{feature}
								</li>
							))}
						</ul>
					</div>
				)}

				{/* Challenges */}
				<div className="mb-8">
					<h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
						Challenges Overcome
					</h2>
					<ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
						{project.challenges.map((challenge, index) => (
							<li key={index}>{challenge}</li>
						))}
					</ul>
				</div>

				{/* Future Plans */}
				<div className="mb-10">
					<h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
						Future Roadmap
					</h2>
					<ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
						{project.futurePlans.map((plan, index) => (
							<li key={index}>{plan}</li>
						))}
					</ul>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200 dark:border-white/10">
					<Magnetic strength={0.25}>
						<a
							href={project.liveDemo}
							target="_blank"
							rel="noopener noreferrer"
							className={`${btnClass} text-white bg-black dark:bg-white dark:text-black hover:opacity-90`}>
							Live Project ↗
						</a>
					</Magnetic>
					<Magnetic strength={0.25}>
						<a
							href={project.github}
							target="_blank"
							rel="noopener noreferrer"
							className={`${btnClass} text-gray-900 dark:text-white bg-transparent`}>
							GitHub Repository ↗
						</a>
					</Magnetic>
				</div>
			</div>
		</main>
	);
}
