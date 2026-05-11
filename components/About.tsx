"use client";

import Image from "next/image";

export default function About() {
	return (
		<section
			id="about"
			className="scroll-mt-32 pt-20">
			<p className="text-center text-gray-600 font-semibold">Get To Know More</p>
			<h2 className="text-5xl text-center font-bold mb-10 title">About Me</h2>
			<div className="flex flex-col gap-12">
				<div className="flex flex-col xl:flex-row gap-16 items-center justify-center">
					<div className="w-full xl:w-[400px] h-[400px] rounded-3xl overflow-hidden flex-shrink-0 about-image-co fancy-shadow relative">
						<Image
							src="/assets/aboutImage.png"
							alt="About Rihad"
							fill
							className="object-cover"
							sizes="(max-width: 1280px) 100vw, 400px"
						/>
					</div>

					<div className="flex-1 text-justify text-gray-600 text-lg leading-relaxed break-words">
						<p>
							I’m Rihad Jahan Opu, a dedicated Full-Stack Developer with
							expertise in ReactJS, NextJS, Node.js, and React Native. I
							specialize in creating secure, scalable, and high-performance web
							and mobile applications tailored to meet your unique business
							requirements. With a strong command of both front-end and back-end
							technologies, I deliver seamless user experiences and robust
							functionalities. Whether it’s a dynamic website, a powerful API,
							or a feature-rich cross-platform mobile app, I’m passionate about
							bringing your vision to life with precision, innovation, and
							creativity. Let’s work together to build solutions that make an
							impact.
						</p>
					</div>
				</div>

				<div className="flex flex-col sm:flex-row gap-6 w-full">
					<div className="flex-1 bg-white border border-gray-300 rounded-3xl p-8 text-center">
						<Image
							src="/assets/experience.png"
							alt="Experience"
							width={32}
							height={32}
							className="mx-auto mb-4 h-8 w-auto"
						/>
						<h3 className="font-bold text-xl mb-2">Experience</h3>
						<p className="text-gray-600">
							3+ years <br />
							Full-stack developer
						</p>
					</div>
					<div className="flex-1 bg-white border border-gray-300 rounded-3xl p-8 text-center">
						<Image
							src="/assets/education.png"
							alt="Education"
							width={32}
							height={32}
							className="mx-auto mb-4 h-8 w-auto"
						/>
						<h3 className="font-bold text-xl mb-2">Education</h3>
						<p className="text-gray-600">
							B.Sc. Bachelors Degree
							<br />
							M.Sc. Masters Degree
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
