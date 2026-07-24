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
	return { title: `${project.title} | My Portfolio` };
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

	return (
		<main className="min-h-screen bg-white pt-20 pb-16 px-4">
			<div className="max-w-4xl mx-auto">
				{/* ব্যাক বাটন */}
				<Link
					href="/projects"
					className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition-colors">
					← Back to Projects
				</Link>

				<h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
					{project.title}
				</h1>

				{/* হিরো ইমেজ */}
				<div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-8 border border-gray-200 shadow-lg">
					<Image
						src={project.image}
						alt={project.title}
						fill
						className="object-cover"
						priority
					/>
				</div>

				{/* ডেসক্রিপশন */}
				<p className="text-gray-700 text-lg leading-relaxed mb-8">
					{project.description}
				</p>

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
