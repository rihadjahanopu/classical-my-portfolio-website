"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

// Component Imports
import About from "../components/About";
import AmbientSpotlight from "../components/AmbientSpotlight";
import Background from "../components/Background";
import Blog from "../components/Blog";
import Contact from "../components/Contact";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Preloader from "../components/Preloader";
import Projects from "../components/Projects";
import Toast from "../components/Toast";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isInstant, setIsInstant] = useState(false);
	const container = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const hasVisited =
			typeof window !== "undefined" &&
			Boolean(sessionStorage.getItem("portfolio_has_visited"));

		// 1. Initialize Lenis for smooth scrolling
		const lenis = new Lenis({
			duration: 1.5,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
			wheelMultiplier: 1.1,
			touchMultiplier: 1.5,
			infinite: false,
		});

		if (typeof window !== "undefined") {
			(window as any).__lenis = lenis;
			if ("scrollRestoration" in history) {
				history.scrollRestoration = "manual";
			}
			if (!window.location.hash) {
				window.scrollTo(0, 0);
				lenis.scrollTo(0, { immediate: true });
			}
		}

		// 2. Connect ScrollTrigger to Lenis
		lenis.on("scroll", ScrollTrigger.update);

		// 3. Single Animation Loop (optimized)
		let rafId: number;
		function raf(time: number) {
			lenis.raf(time);
			rafId = requestAnimationFrame(raf);
		}
		rafId = requestAnimationFrame(raf);

		// 4. Handle transition and cleanup
		let timer: NodeJS.Timeout | null = null;

		if (hasVisited) {
			setIsInstant(true);
			setIsLoading(false);
			lenis.start();
			if (!window.location.hash) {
				lenis.scrollTo(0, { immediate: true });
			}
		} else {
			lenis.stop(); // Disable scroll during initial loading
			timer = setTimeout(() => {
				setIsLoading(false);
				try {
					sessionStorage.setItem("portfolio_has_visited", "true");
				} catch {
					// In case storage is restricted
				}
				lenis.start(); // Re-enable scroll
				if (!window.location.hash) {
					lenis.scrollTo(0, { immediate: true });
				}
			}, 1800);
		}

		return () => {
			if (timer) clearTimeout(timer);
			cancelAnimationFrame(rafId);
			lenis.destroy();
			if (typeof window !== "undefined") {
				delete (window as any).__lenis;
			}
		};
	}, []);

	useGSAP(
		() => {
			if (isLoading) return;

			// Advanced Initial Hero Choreography
			const tl = gsap.timeline();

			tl.from(".logo-in", { y: -50, opacity: 0, duration: 1, ease: "expo.out" })
				.from(
					".nav-links li",
					{
						y: -30,
						opacity: 0,
						duration: 0.6,
						stagger: 0.08,
						ease: "back.out(1.7)",
					},
					"-=0.8"
				)
				.from(
					".profile-in-co",
					{
						scale: 0.8,
						opacity: 0,
						rotation: 5,
						duration: 1.5,
						ease: "elastic.out(1, 0.3)",
					},
					"-=0.4"
				)
				.from(
					".hero-p1",
					{ opacity: 0, x: -50, duration: 0.8, ease: "power3.out" },
					"-=1"
				)
				.from(
					".hero-title",
					{
						opacity: 0,
						y: 50,
						rotationX: -90,
						transformOrigin: "0% 50% -50",
						duration: 1,
						ease: "back.out(1.5)",
					},
					"-=0.8"
				)
				.from(".hero-p2", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
				.from(
					".hero-btns",
					{
						opacity: 0,
						y: 20,
						duration: 0.8,
						ease: "back.out(1.5)",
					},
					"-=0.4"
				)
				.from(
					"#socials-container .icon",
					{
						opacity: 0,
						y: 20,
						duration: 0.5,
						stagger: 0.1,
						ease: "back.out(1.5)",
					},
					"-=0.4"
				);

			// Advanced Scroll Reveal for Section Titles
			const titleAnims = gsap.utils
				.toArray<HTMLElement>(".title")
				.map((title) =>
					gsap.from(title, {
						scrollTrigger: {
							trigger: title,
							start: "top 95%",
						},
						y: 30,
						opacity: 0,
						duration: 1,
						ease: "power3.out",
					})
				);

			// Parallax Effect for Profile Image
			let mm = gsap.matchMedia();

			mm.add("(min-width: 1024px)", () => {
				gsap.to(".profile-in-co", {
					scrollTrigger: {
						trigger: "#profile",
						start: "top top",
						end: "bottom top",
						scrub: true,
					},
					y: 80,
				});
			});

			mm.add("(max-width: 1023px)", () => {
				gsap.to(".profile-in-co", {
					scrollTrigger: {
						trigger: "#profile",
						start: "top top",
						end: "bottom top",
						scrub: true,
					},
					y: 30,
				});
			});

			// Parallax Effect for About Image
			const aboutAnim = gsap.to(".about-image-co", {
				scrollTrigger: {
					trigger: "#about",
					start: "top bottom",
					end: "bottom top",
					scrub: true,
				},
				y: -30,
			});

			// Staggered Reveal for Experience Articles
			const expAnims = gsap.utils
				.toArray<HTMLElement>(".experience-details-container")
				.map((container) =>
					gsap.from(container.querySelectorAll("article"), {
						scrollTrigger: {
							trigger: container,
							start: "top 90%",
						},
						y: 20,
						opacity: 0,
						duration: 0.5,
						stagger: 0.05,
						ease: "power2.out",
					})
				);

			// ScrollTrigger Advanced Magic for Projects
			const projectAnims = gsap.utils
				.toArray<HTMLElement>(".project-card")
				.map((card) =>
					gsap.from(card, {
						scrollTrigger: {
							trigger: card,
							start: "top 90%",
							toggleActions: "play none none reverse",
						},
						y: 50,
						opacity: 0,
						scale: 0.95,
						duration: 0.6,
						ease: "power2.out",
					})
				);

			// Ensure everything is calculated correctly after loader exit
			const refreshTimer = setTimeout(() => {
				ScrollTrigger.refresh();
			}, 1000);

			// ✅ CRITICAL FIX: Full cleanup
			return () => {
				clearTimeout(refreshTimer);
				tl.kill();
				mm.revert();
				titleAnims.forEach((anim) => anim.scrollTrigger?.kill());
				aboutAnim.scrollTrigger?.kill();
				expAnims.forEach((anim) => anim.scrollTrigger?.kill());
				projectAnims.forEach((anim) => anim.scrollTrigger?.kill());
				ScrollTrigger.getAll().forEach((st) => st.kill());
			};
		},
		{ scope: container, dependencies: [isLoading] }
	);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<>
			<AmbientSpotlight />
			<Background />
			<Preloader isLoading={isLoading} isInstant={isInstant} />
			<Toast />

			<main
				className="w-full max-w-6xl mx-auto relative px-4 overflow-x-hidden"
				ref={container}>
				<Navbar
					menuOpen={menuOpen}
					toggleMenu={toggleMenu}
				/>
				<Hero />
				<About />
				<Experience />
				<Projects />
				<Blog />
				<Contact />
				<Footer />
			</main>
		</>
	);
}
