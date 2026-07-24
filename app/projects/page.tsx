import Image from "next/image";
import Link from "next/link";
import { projectsData } from "./data";

export default function ProjectsPage() {
	return (
		<section
			className="min-h-screen pt-20 pb-16 px-4"
			id="projects">
			<p className="text-center text-gray-600 font-semibold">
				Browse My Recent
			</p>
			<h2 className="text-5xl text-center font-bold mb-10">Projects</h2>

			<div className="flex flex-col lg:flex-row gap-8 justify-center max-w-6xl mx-auto">
				{projectsData.map((project) => (
					<div
						key={project.id}
						className="flex-1 bg-[#fafafa] border border-gray-300 rounded-3xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between">
						<div>
							<div className="overflow-hidden rounded-2xl mb-6 relative aspect-video">
								<Image
									src={project.image}
									alt={project.title}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-110"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								/>
							</div>
							<h3 className="text-2xl font-bold text-black mb-4">
								{project.title}
							</h3>
							<p className="text-gray-600 text-sm mb-4 line-clamp-2">
								{project.description}
							</p>
						</div>

						<Link
							href={`/projects/${project.id}`}
							className="font-semibold transition-all duration-300 px-6 py-2.5 rounded-full border-2 border-[#353535] flex justify-center items-center text-sm hover:bg-[#353535] hover:text-white text-black bg-transparent w-full">
							View Details
						</Link>
					</div>
				))}
			</div>
		</section>
	);
}
