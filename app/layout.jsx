export const viewport = {
  themeColor: '#fafafa',
};

export const metadata = {
  title: 'Rihad Jahan Opu',
  description: 'I’m Rihad Jahan Opu, a dedicated Full-Stack Developer with expertise in ReactJS, NextJS, Node.js, and React Native. I specialize in creating secure, scalable, and high-performance web and mobile applications tailored to meet your unique business requirements. With a strong command of both front-end and back-end technologies, I deliver seamless userexperiences and robust functionalities. Whether it’s a dynamic website, a powerful API, or a feature-rich cross-platform mobile app, I’m passionate about bringing your vision to life with precision, innovation, and creativity. Let’s work together to build solutions that make an impact.',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/icon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon/favicon.png' },
    ],
    apple: [
      { url: '/icon/apple-touch-icon.png', sizes: '180x180' }
    ]
  },
  openGraph: {
    title: 'Rihad Jahan Opu',
    description: 'I’m Rihad Jahan Opu, a dedicated Full-Stack Developer with expertise in ReactJS, NextJS, Node.js, and React Native.',
    type: 'website',
    url: 'https://www.rihadjahanopu.com',
    siteName: 'Rihad Jahan Opu Portfolio',
    locale: 'en_US',
    images: [
      {
        url: '/assets/rihadprofile.jpg',
        width: 800,
        height: 600,
        alt: 'Rihad Jahan Opu Profile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rihad Jahan Opu | Full-Stack Developer',
    description: 'I’m Rihad Jahan Opu, a dedicated Full-Stack Developer with expertise in ReactJS, NextJS, Node.js, and React Native.',
    images: ['/assets/rihadprofile.jpg'],
    creator: '@rihadjahanopu',
  },
  alternates: {
    canonical: 'https://www.rihadjahanopu.com',
  },
  authors: [{ name: 'Rihad Jahan Opu', url: 'https://www.rihadjahanopu.com' }],
  keywords: ['Rihad Jahan Opu', 'Full-Stack Developer', 'React Developer', 'Next.js Developer', 'Node.js', 'Portfolio'],
  metadataBase: new URL('https://www.rihadjahanopu.com'),
};

import { Poppins, JetBrains_Mono } from "next/font/google";
import "./style.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "500"],
  variable: "--font-jetbrains",
});

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "Person",
    "name": "Rihad Jahan Opu",
    "additionalName": "rihadjahanopu",
    "image": "https://www.rihadjahanopu.com/assets/rihadprofile.jpg",
    "url": "https://www.rihadjahanopu.com",
    "birthDate": "2001-12-05",
    "sameAs": [
      "https://www.linkedin.com/in/rihadjahanopu",
      "https://www.github.com/rihadjahanopu",
      "https://www.twitter.com/rihadjahanopu",
      "https://www.instagram.com/rihadjahanopu",
      "https://www.threads.net/@rihadjahanopu",
      "https://www.tiktok.com/@rihadjahanopu",
      "https://www.pinterest.com/rihadjahanopu",
      "https://www.about.me/rihadjahanopu",
      "https://www.crunchbase.com/person/rihad-jahan-opu",
      "https://www.medium.com/@rihadjahanopu",
      "https://www.gitlab.com/rihadjahanopu",
      "https://www.facebook.com/rihadjahanopu",
      "https://www.filmfreeway.com/rihadjahanopu",
      "https://www.g.dev/rihadjahanopu",
      "https://www.youtube.com/@rihadjahanopu",
      "https://www.quora.com/profile/Rihad-Jahan-Opu-Full-Stack-Developer",
      "https://g.co/kgs/wXkaCvc"
    ],
    "gender": "Male",
    "email": "mailto:itrihad@gmail.com",
    "nationality": "Bangladeshi",
    "jobTitle": "Founder & Full-Stack Web Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Gladepik",
      "url": "https://gladepik.com"
    },
    "birthPlace": {
      "@type": "Place",
      "name": "Sunamganj, Bangladesh",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sunamganj",
        "addressRegion": "Sylhet",
        "addressCountry": "Bangladesh"
      }
    },
    "description": "I’m Rihad Jahan Opu, a dedicated Full-Stack Developer with expertise in ReactJS, NextJS, Node.js, and React Native. I specialize in creating secure, scalable, and high-performance web and mobile applications tailored to meet your unique business requirements. With a strong command of both front-end and back-end technologies, I deliver seamless userexperiences and robust functionalities. Whether it’s a dynamic website, a powerful API, or a feature-rich cross-platform mobile app, I’m passionate about bringing your vision to life with precision, innovation, and creativity. Let’s work together to build solutions that make an impact.",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Madan Mohan College Sylhet",
      "url": "https://mmc.edu.bd/"
    },
    "skills": "JavaScript, Typescript, Nextjs, React, Rust, HTML, CSS, SCSS"
  };

  return (
    <html lang="en" className={`${poppins.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="theme-color" content="#fafafa" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
