"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence, useScroll } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const container = useRef(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 350]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);

  // 3D Profile Tilt logic
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const rotateX = useTransform(cardY, [-100, 100], [15, -15]);
  const rotateY = useTransform(cardX, [-100, 100], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    cardX.set(e.clientX - centerX);
    cardY.set(e.clientY - centerY);
  };
  const handleMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };
  useEffect(() => {
    // 1. Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // 2. Connect ScrollTrigger to Lenis
    lenis.on('scroll', ScrollTrigger.update);
    lenis.stop(); // Disable scroll during loading

    // 3. Single Animation Loop (optimized)
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 4. Handle transition and cleanup
    const timer = setTimeout(() => {
      setIsLoading(false);
      lenis.start(); // Re-enable scroll
    }, 2000);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    if (isLoading) return;

    // Advanced Initial Hero Choreography
    const tl = gsap.timeline();

    tl.from('.logo-in', { y: -50, opacity: 0, duration: 1, ease: 'expo.out' })
      .from('.nav-links li', { 
        y: -30, 
        opacity: 0, 
        duration: 0.6, 
        stagger: 0.08, 
        ease: 'back.out(1.7)' 
      }, "-=0.8")
      .from('.profile-in-co', { 
        scale: 0.8, 
        opacity: 0, 
        rotation: 5,
        duration: 1.5, 
        ease: 'elastic.out(1, 0.3)' 
      }, "-=0.4")
      .from('.hero-p1', { opacity: 0, x: -50, duration: 0.8, ease: 'power3.out' }, "-=1")
      .from('.hero-title', { 
        opacity: 0, 
        y: 50, 
        rotationX: -90,
        transformOrigin: "0% 50% -50",
        duration: 1, 
        ease: 'back.out(1.5)' 
      }, "-=0.8")
      .from('.hero-p2', { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
      .from('.hero-btns', { 
        opacity: 0, 
        y: 20, 
        duration: 0.8, 
        ease: 'back.out(1.5)' 
      }, "-=0.4")
      .from('#socials-container .icon', { 
        opacity: 0, 
        y: 20, 
        duration: 0.5, 
        stagger: 0.1, 
        ease: 'back.out(1.5)' 
      }, "-=0.4");

    // Advanced Scroll Reveal for Section Titles
    gsap.utils.toArray('.title').forEach((title) => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: "top 95%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });

    // Parallax Effect for Profile Image
    gsap.to('.profile-in-co', {
      scrollTrigger: {
        trigger: '#profile',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: 100,
      scale: 0.95
    });

    // Parallax Effect for About Image
    gsap.to('.about-image-co', {
      scrollTrigger: {
        trigger: '#about',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      y: -30,
      rotate: 2
    });

    // Staggered Reveal for Experience Articles
    gsap.utils.toArray('.experience-details-container').forEach((container) => {
      gsap.from(container.querySelectorAll('article'), {
        scrollTrigger: {
          trigger: container,
          start: "top 90%",
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out"
      });
    });

    // ScrollTrigger Advanced Magic for Projects
    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        ease: "power2.out"
      });
    });

    // Ensure everything is calculated correctly after loader exit
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      clearTimeout(refreshTimer);
    };

  }, { scope: container, dependencies: [isLoading] });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const linkClass = "text-black no-underline transition-all duration-300 hover:text-gray-500 hover:underline hover:underline-offset-8 decoration-gray-400";
  const btnClass = "font-semibold transition-all duration-300 p-3 w-32 rounded-full border-2 border-[#353535] flex justify-center items-center cursor-pointer text-sm";

  return (
    <>
      {/* Premium Background Elements */}
      <div className="noise-overlay"></div>
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      <div className="bg-blob blob-3"></div>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center pointer-events-auto"
            exit={{ 
              opacity: 0,
              y: "-100%", 
              transition: { 
                y: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
                opacity: { duration: 0.4, delay: 0.4 }
              } 
            }}
            style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
          >
            <motion.img 
              src="/assets/daynamikrihad.svg" 
              alt="Loading logo" 
              className="w-64 md:w-96 mb-12"
              animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div className="flex gap-1">
              {["L", "O", "A", "D", "I", "N", "G", ".", ".", "."].map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-bold text-lg tracking-[2px] text-gray-800"
                  initial={{ y: 0 }}
                  animate={{ y: [-10, 0, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="w-full max-w-6xl mx-auto relative px-4 overflow-x-hidden" ref={container}>
        <div className="fixed top-4 left-0 right-0 w-full z-[1000] px-4">
          <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] px-6 py-3 transition-all duration-300">
            <nav id="desktop-nav" className="hidden lg:flex justify-between items-center">
              <div className="text-xl cursor-default">
                <a href="#profile" className="transition-transform duration-300 hover:scale-105 block">
                  <img src="/assets/daynamikrihad.svg" alt="logo" className="w-24 logo-in" />
                </a>
              </div>
              <ul className="flex gap-8 list-none text-xl nav-links">
                {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((item) => (
                  <li key={item}>
                    <a className={linkClass} href={`#${item.toLowerCase() === 'home' ? 'profile' : item.toLowerCase()}`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav id="hamburger-nav" className="flex lg:hidden justify-between items-center relative">
              <div className="text-xl">
                <a href="#profile">
                  <img src="/assets/daynamikrihad.svg" alt="logo" className="w-20 logo-in" />
                </a>
              </div>
              <div className="flex flex-col justify-between h-6 w-8 cursor-pointer z-50 group" onClick={toggleMenu}>
                <span className={`w-full h-0.5 bg-black transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[11px]" : ""}`}></span>
                <span className={`w-full h-0.5 bg-black transition-all duration-300 ${menuOpen ? "opacity-0" : "group-hover:translate-x-1"}`}></span>
                <span className={`w-full h-0.5 bg-black transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[11px]" : ""}`}></span>
              </div>
              <div className={`absolute top-[130%] left-0 right-0 mt-2 bg-white/80 backdrop-blur-lg border border-white/40 shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 origin-top flex flex-col items-center ${menuOpen ? "max-h-[400px] py-6 opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"}`}>
                {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((item) => (
                  <li key={item} className="w-full text-center list-none group">
                    <a className="block py-4 text-2xl text-black transition-colors duration-300 hover:bg-black/5" href={`#${item.toLowerCase() === 'home' ? 'profile' : item.toLowerCase()}`} onClick={toggleMenu}>
                      {item}
                    </a>
                  </li>
                ))}
              </div>
            </nav>
          </div>
        </div>

        <motion.section id="profile" style={{ y: heroY, opacity: heroOpacity }} className="flex flex-col lg:flex-row justify-center lg:gap-20 items-center min-h-screen pt-32 scroll-mt-32">
          <motion.div 
            className="flex w-[350px] h-[350px] lg:w-[500px] lg:h-[500px] perspective-[1000px] section__pic-container"
          >
            <motion.img 
              src="/assets/rihadprofile.jpg" 
              alt="Rihad Jahan Opu" 
              className="w-full h-full object-cover rounded-full cursor-pointer profile-in-co"
              style={{ rotateX, rotateY }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
          </motion.div>
          <div className="text-center mt-10 lg:mt-0 section__text">
            <p className="text-gray-600 font-semibold text-lg hero-p1">Hello, I'm</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-black my-2 hero-title">Rihad Jahan Opu</h1>
            <p className="text-2xl text-gray-600 font-semibold mb-6 hero-p2">Full-Stack Web developer</p>
            <div className="flex flex-wrap justify-center gap-4 hero-btns">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${btnClass} hover:bg-[#353535] hover:border-[#353535] hover:text-white text-black bg-transparent`}
                onClick={() => window.open('/assets/resume-example.pdf')}
              >
                Download CV
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${btnClass} bg-[#353535] text-white hover:bg-black hover:border-black`}
                onClick={() => window.location.href = '/#contact'}
              >
                Contact Info
              </motion.button>
            </div>
            <div id="socials-container" className="flex justify-center gap-4 mt-8">
              <img src="/assets/linkedin.png" alt="LinkedIn" className="h-8 cursor-pointer icon" onClick={() => window.location.href = 'https://linkedin.com/in/rihadjahanopu'} />
              <img src="/assets/github.png" alt="Github" className="h-8 cursor-pointer icon" onClick={() => window.location.href = 'https://github.com/rihadjahanopu'} />
              <a href="/apk/Rihad.apk" download="Rihad.apk">
                <img src="/assets/google-play.png" alt="Android App" className="h-8 cursor-pointer icon" />
              </a>
            </div>
          </div>
        </motion.section>

        <section 
          id="about"
          className="scroll-mt-32 pt-20"
        >
          <p className="text-center text-gray-600 font-semibold">Get To Know More</p>
          <h2 className="text-5xl text-center font-bold mb-10 title">About Me</h2>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col xl:flex-row gap-16 items-center justify-center">
              <div 
                className="w-full xl:w-[400px] h-[400px] rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 about-image-co"
              >
                <img src="/assets/aboutImage.png" alt="About Rihad" className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 text-justify text-gray-600 text-lg leading-relaxed break-words">
                <p>
                  I’m Rihad Jahan Opu, a dedicated Full-Stack Developer with expertise in ReactJS, NextJS, Node.js, and React Native. I specialize in creating secure, scalable, and high-performance web and mobile applications tailored to meet your unique business requirements. With a strong command of both front-end and back-end technologies, I deliver seamless user experiences and robust functionalities. Whether it’s a dynamic website, a powerful API, or a feature-rich cross-platform mobile app, I’m passionate about bringing your vision to life with precision, innovation, and creativity. Let’s work together to build solutions that make an impact.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 w-full">
              <div 
                className="flex-1 bg-white border border-gray-300 rounded-3xl p-8 text-center"
              >
                <img src="/assets/experience.png" alt="Experience" className="h-8 mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">Experience</h3>
                <p className="text-gray-600">3+ years <br />Full-stack developer</p>
              </div>
              <div 
                className="flex-1 bg-white border border-gray-300 rounded-3xl p-8 text-center"
              >
                <img src="/assets/education.png" alt="Education" className="h-8 mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">Education</h3>
                <p className="text-gray-600">B.Sc. Bachelors Degree<br />M.Sc. Masters Degree</p>
              </div>
            </div>
          </div>
        </section>

        <section 
          id="experience"
          className="scroll-mt-32 pt-20"
        >
          <p className="text-center text-gray-600 font-semibold">Explore My</p>
          <h2 className="text-5xl text-center font-bold mb-10 title">Experience</h2>
          <div className="flex flex-col lg:flex-row gap-8 justify-center">
            <div className="flex-1 bg-white border border-gray-300 rounded-3xl p-8 text-center shadow-sm experience-details-container">
              <h2 className="text-gray-600 font-semibold text-2xl mb-8">Frontend Development</h2>
              <div className="flex flex-wrap gap-8 justify-around text-left">
                {[
                  { name: 'HTML', level: 'Experienced' },
                  { name: 'CSS', level: 'Experienced' },
                  { name: 'SASS', level: 'Intermediate' },
                  { name: 'JavaScript', level: 'Basic' },
                  { name: 'TypeScript', level: 'Basic' },
                  { name: 'Tailwind', level: 'Intermediate' }
                ].map((skill, index) => (
                  <article 
                    key={skill.name}
                    className="flex items-start gap-4 w-36"
                  >
                    <img src="/assets/checkmark.png" alt="checkmark" className="h-6 mt-1" />
                    <div>
                      <h3 className="font-bold">{skill.name}</h3>
                      <p className="text-gray-600 text-sm">{skill.level}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="flex-1 bg-white border border-gray-300 rounded-3xl p-8 text-center shadow-sm experience-details-container">
              <h2 className="text-gray-600 font-semibold text-2xl mb-8">Backend Development</h2>
              <div className="flex flex-wrap gap-8 justify-around text-left">
                {[
                  { name: 'MongoDB', level: 'Basic' },
                  { name: 'Node JS', level: 'Intermediate' },
                  { name: 'Express JS', level: 'Intermediate' },
                  { name: 'React JS', level: 'Intermediate' },
                  { name: 'Next JS', level: 'Intermediate' },
                  { name: 'Git', level: 'Intermediate' }
                ].map((skill, index) => (
                  <article 
                    key={skill.name}
                    className="flex items-start gap-4 w-36"
                  >
                    <img src="/assets/checkmark.png" alt="checkmark" className="h-6 mt-1" />
                    <div>
                      <h3 className="font-bold">{skill.name}</h3>
                      <p className="text-gray-600 text-sm">{skill.level}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-32 pt-20">
          <p className="text-center text-gray-600 font-semibold">Browse My Recent</p>
          <h2 className="text-5xl text-center font-bold mb-10 title">Projects</h2>
          <div className="flex flex-col lg:flex-row gap-8 justify-center">
            {[1, 2, 3].map((num) => (
              <div 
                className="flex-1 bg-[#fafafa] border border-gray-300 rounded-3xl p-6 text-center project-card shadow-sm hover:shadow-lg transition-shadow duration-300" 
                key={num}
              >
                <div className="overflow-hidden rounded-2xl mb-6">
                  <img 
                    src={`/assets/project-${num}.png`} 
                    alt={`Project ${num}`} 
                    className="w-full h-auto object-cover" 
                  />
                </div>
                <h2 className="text-2xl font-bold text-black mb-6">Project {['One', 'Two', 'Three'][num - 1]}</h2>
                <div className="flex flex-wrap justify-center gap-4">
                  <button 
                    className={`${btnClass} text-black bg-transparent w-auto px-6 py-3`}
                    onClick={() => window.location.href = 'https://github.com/'}
                  >
                    Github
                  </button>
                  <button 
                    className={`${btnClass} text-black bg-transparent w-auto px-6 py-3`}
                    onClick={() => window.location.href = 'https://github.com/'}
                  >
                    Live Demo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <motion.section 
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
          className="scroll-mt-32 pt-20 pb-20"
        >
          <p className="text-center text-gray-600 font-semibold">Get in Touch</p>
          <h2 className="text-4xl md:text-5xl text-center font-bold mb-10 title">Contact Me</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full max-w-4xl mx-auto px-4">
            <motion.div 
              whileHover={{ scale: 1.02, translateY: -5 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 cursor-pointer group bg-white border border-gray-200 rounded-2xl py-4 px-6 shadow-sm hover:shadow-md transition-all duration-300 w-full md:w-auto"
              onClick={() => window.location.href = "mailto:itrihad@gmail.com"}
            >
              <div className="bg-gray-50 p-2 rounded-xl border border-gray-100 group-hover:bg-blue-50 transition-colors duration-300">
                <img src="/assets/email.png" alt="Email" className="h-6 w-6 md:h-8 md:w-8 object-contain" />
              </div>
              <p className="text-base md:text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">itrihad@gmail.com</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02, translateY: -5 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 cursor-pointer group bg-white border border-gray-200 rounded-2xl py-4 px-6 shadow-sm hover:shadow-md transition-all duration-300 w-full md:w-auto"
              onClick={() => window.open("https://www.linkedin.com/in/rihadjahanopu")}
            >
              <div className="bg-gray-50 p-2 rounded-xl border border-gray-100 group-hover:bg-blue-50 transition-colors duration-300">
                <img src="/assets/linkedin.png" alt="LinkedIn" className="h-6 w-6 md:h-8 md:w-8 object-contain" />
              </div>
              <p className="text-base md:text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">LinkedIn</p>
            </motion.div>
          </div>
        </motion.section>

        <footer className="py-12 md:h-48 flex flex-col justify-center items-center bg-white/30 backdrop-blur-sm mt-10">
          <nav className="mb-8 flex flex-col items-center gap-8">
            <a href="#profile" className="transition-transform duration-300 hover:scale-110">
              <img src="/assets/daynamikrihad.svg" className="w-40 md:w-48" alt="Logo" />
            </a>
            <ul className="flex flex-wrap justify-center gap-6 md:gap-12 list-none text-lg md:text-xl">
              {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <a className={linkClass} href={`#${item.toLowerCase() === 'home' ? 'profile' : item.toLowerCase()}`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-center text-gray-500 text-sm md:text-base px-4">
            Copyright &#169; 2025 Rihad Jahan Opu. All Rights Reserved.
          </p>
        </footer>
      </main>
    </>
  );
}
