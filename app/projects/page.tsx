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

			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
				{projectsData.map((project) => (
					<article
						key={project.id}
						className="bg-[#fafafa] border border-gray-300 rounded-3xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between project-card"
						aria-label={project.title}>
						<div>
							<div className="overflow-hidden rounded-2xl mb-6 relative aspect-video">
								<Image
									src={project.image}
									alt={project.imageAlt || `${project.title} Preview`}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-110"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
								/>
								{project.isOpenSource && (
									<span className="absolute top-3 right-3 bg-emerald-600/90 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow backdrop-blur-sm tracking-wide">
										Open Source
									</span>
								)}
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
					</article>
				))}
			</div>
		</section>
	);
}
