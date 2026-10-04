// "Work with me": the business half. Be concrete: what you offer, how it runs, how to start.
export const work = {
	intro: '‹Two sentences: what kind of work you take on and for whom. E.g. "I help teams take AI from demo to production."›',
	availability: '‹Open to 1–2 engagements from ‹month››', // shows as a status tag
	services: [
		{ title: '‹Service 1›', zh: '咨询', summary: '‹What it is, in one line.›', deliverables: ['‹deliverable›', '‹deliverable›'], engagement: '‹e.g. 2–4 weeks, fixed scope›' },
		{ title: '‹Service 2›', zh: '构建', summary: '‹…›', deliverables: ['‹…›'], engagement: '‹…›' },
		{ title: '‹Service 3›', zh: '培训', summary: '‹…›', deliverables: ['‹…›'], engagement: '‹…›' }
	],
	process: [
		{ step: 'Call', body: '‹30 minutes, free: is this a fit?›' },
		{ step: 'Scope', body: '‹Written proposal: goals, deliverables, timeline, price.›' },
		{ step: 'Build', body: '‹Weekly demos, async updates.›' },
		{ step: 'Handover', body: '‹Docs, training, and a clean exit.›' }
	],
	proof: [
		{ quote: '‹Short testimonial.›', who: '‹Name, Role, Company›' }
	],
	cta: { label: 'Book a call', href: 'mailto:‹hello@your-domain.dev›' }
};
