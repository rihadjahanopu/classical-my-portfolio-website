import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsData } from "../data";

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
		"font-semibold transition-all duration-300 px-6 py-2.5 rounded-full border-2 border-[#353535] flex justify-center items-center text-sm hover:bg-[#353535] hover:text-white";

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
		<main className="min-h-screen bg-white pt-20 pb-16 px-4">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<div className="max-w-4xl mx-auto">
				{/* ব্যাক বাটন */}
				<Link
					href="/projects"
					className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition-colors">
					← Back to Projects
				</Link>

				<div className="flex flex-wrap items-center gap-3 mb-6">
					<h1 className="text-4xl md:text-5xl font-bold text-black">
						{project.title}
					</h1>
					{project.isOpenSource && (
						<span className="bg-emerald-100 text-emerald-800 text-sm font-semibold px-3 py-1 rounded-full border border-emerald-300">
							Open Source
						</span>
					)}
					{project.license && (
						<span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full border border-gray-300">
							{project.license}
						</span>
					)}
				</div>

				{/* হিরো ইমেজ */}
				<div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-8 border border-gray-200 shadow-lg">
					<Image
						src={project.image}
						alt={project.imageAlt || `${project.title} Preview`}
						fill
						className="object-cover"
						priority
					/>
				</div>

				{/* ডেসক্রিপশন */}
				<p className="text-gray-700 text-lg leading-relaxed mb-8">
					{project.description}
				</p>

				{/* হাইলাইটস / পারফরম্যান্স মেট্রিক্স */}
				{project.highlights && project.highlights.length > 0 && (
					<div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-3xl">
						<h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
							Performance & Architecture Benchmarks
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							{project.highlights.map((item, index) => (
								<div
									key={index}
									className="flex items-start gap-2.5 text-sm font-medium text-gray-800 bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs">
									<span className="text-emerald-600 font-bold text-base leading-none">✓</span>
									<span>{item}</span>
								</div>
							))}
						</div>
					</div>
				)}

				{/* টেক স্ট্যাক */}
				<div className="mb-8">
					<h2 className="text-xl font-semibold mb-3 text-black">
						Technologies Used
					</h2>
					<div className="flex flex-wrap gap-2">
						{project.techStack.map((tech, index) => (
							<span
								key={index}
								className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-1.5 rounded-full border border-gray-300">
								{tech}
							</span>
						))}
					</div>
				</div>

				{/* ফিচারস */}
				{project.features && project.features.length > 0 && (
					<div className="mb-8">
						<h2 className="text-xl font-semibold mb-3 text-black">
							Key Features & Capabilities
						</h2>
						<ul className="list-disc list-inside text-gray-600 space-y-2">
							{project.features.map((feature, index) => (
								<li key={index} className="leading-relaxed">
									{feature}
								</li>
							))}
						</ul>
					</div>
				)}

				{/* চ্যালেঞ্জেস */}
				<div className="mb-8">
					<h2 className="text-xl font-semibold mb-3 text-black">
						Challenges Faced
					</h2>
					<ul className="list-disc list-inside text-gray-600 space-y-2">
						{project.challenges.map((challenge, index) => (
							<li key={index}>{challenge}</li>
						))}
					</ul>
				</div>

				{/* ফিউচার প্ল্যান */}
				<div className="mb-10">
					<h2 className="text-xl font-semibold mb-3 text-black">
						Future Plans & Improvements
					</h2>
					<ul className="list-disc list-inside text-gray-600 space-y-2">
						{project.futurePlans.map((plan, index) => (
							<li key={index}>{plan}</li>
						))}
					</ul>
				</div>

				{/* অ্যাকশন বাটন */}
				<div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
					<a
						href={project.liveDemo}
						target="_blank"
						rel="noopener noreferrer"
						className={`${btnClass} text-white bg-black hover:bg-gray-800`}>
						Live Project
					</a>
					<a
						href={project.github}
						target="_blank"
						rel="noopener noreferrer"
						className={`${btnClass} text-black bg-transparent`}>
						GitHub Repository
					</a>
				</div>
			</div>
		</main>
	);
}
