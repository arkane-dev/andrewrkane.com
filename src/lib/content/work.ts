// "Work with me": the business half. Be concrete: what you offer, how it runs, how to start.
// Get in touch only for now. Empty `process` or `proof` hides that section. An empty `engagement` hides that line.
export const work = {
	intro: 'I help startups take AI from prototype to production, especially in robotics and Physical AI.',
	available: false, // true: green pulsing tag. false: muted tag.
	availability: 'Not available for new work', // shows as a status tag
	services: [
		{ title: 'Architecture review', zh: '咨询', summary: 'Is the system sound, and will it scale? Sizing, cost, build vs buy, self-host vs API.', deliverables: [] as string[], engagement: '' },
		{ title: 'Prototype build', zh: '构建', summary: 'A working proof of concept for one problem, handed over with the code.', deliverables: [] as string[], engagement: '' },
		{ title: 'Team training', zh: '培训', summary: 'Data science and ML workshops based on the Field Guide.', deliverables: [] as string[], engagement: '' }
	],
	process: [] as { step: string; body: string }[],
	proof: [] as { quote: string; who: string }[],
	cta: { label: 'Get in touch', href: 'mailto:‹hello@your-domain.dev›' }
};
