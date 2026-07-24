export interface Project {
	id: number;
	title: string;
	image: string;
	github: string;
	liveDemo: string;
	techStack: string[];
	description: string;
	challenges: string[];
	futurePlans: string[];
}

export const projectsData: Project[] = [
	{
		id: 1,
		title: "Digital Life Lessons",
		image: "/assets/project-1.png",
		github: "https://github.com/rihadjahanopu/life-lesson-client",
		liveDemo: "https://life-lesson-client.vercel.app/",
		techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
		description:
			" This application provides an engaging educational experience, offering interactive lessons, comprehensive user dashboards, a rich-text editor for notes, robust authentication, and secure payments.",
		challenges: [
			"Integrating complex payment gateways securely.",
			"Optimizing dynamic images for faster loading speeds.",
		],
		futurePlans: [
			"Add AI-assisted task auto-categorization.",
			"Implement team collaboration features with web sockets.",
		],
	},
	{
		id: 2,
		title: "MarketPlace Buy & Sell",
		image: "/assets/project-2.png",
		github: "https://github.com/rihadjahanopu/marketplace-client",
		liveDemo: "https://marketplace-client-bay.vercel.app/",
		techStack: ["React", "Redux Toolkit", "Node.js", "Express"],
		description:
			"An e-commerce platform offering a smooth checkout experience and real-time inventory updates.This is the frontend for the Marketplace application, built with a modern React stack. It leverages Next.js for server-side rendering and optimal performance, styled with Tailwind CSS, and uses Radix UI for accessible, high-quality components.",
		challenges: [
			"Handling real-time state synchronization across multiple devices.",
			"Structuring Redux store to manage cart state efficiently.",
		],
		futurePlans: [
			"Integrate dark mode support.",
			"Implement multi-currency payment options.",
		],
	},
	{
		id: 3,
		title: "Nexus AI",
		image: "/assets/project-3.png",
		github: "https://github.com/rihadjahanopu/nexes-ai-client",
		liveDemo: "https://nexes-ai-client.vercel.app/",
		techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
		description:
			"Nexus AI Client is the frontend layer of the Nexus AI platform — an intelligent project workspace that combines modern project management with an embedded Agentic AI chat interface powered by Google Gemini.",
		challenges: [
			"Configuring complex Helmrt security rules.",
			"Optimizing SEO for dynamically generated routes.",
		],
		futurePlans: [
			"Add automated newsletter emails for new posts.",
			"Include a comment rating and moderation dashboard.",
		],
	},
];
