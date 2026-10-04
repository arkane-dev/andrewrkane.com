// /now page (nownownow.com convention): what you're focused on at the moment. Update monthly.
export const now = {
	updated: '2026-10-04',
	where: 'Newcastle',
	focus: [
		{ title: 'Multimodal world models', body: 'Researching multimodal world models for true physical understanding.' },
		{ title: 'Robotics engineering & control', body: "You can't build models for systems you don't understand." },
		{ title: 'GenAI-first tools', body: 'Building GenAI-first personal productivity tools with a cyberpunk aesthetic.' }
	],
	// A string is one item. { label, items } is a group with links under it.
	reading: [
		'Monk and Robot by Becky Chambers',
		'Radicalized by Cory Doctorow',
		'Apostles of Mercy by Lindsay Ellis',
		{
			label: 'Research papers',
			items: [
				{ title: 'PostCam: Camera-Controllable Novel-View Video Generation with Query-Shared Cross-Attention', href: 'https://arxiv.org/abs/2511.17185' },
				{ title: 'DreamCharacter-1: From 3D Generative Foundation Models to Product-Ready Character Generation', href: 'https://arxiv.org/abs/2607.07817' },
				{ title: 'CLAY: Conditional Visual Similarity Modulation in Vision-Language Embedding Space', href: 'https://arxiv.org/abs/2604.11539' }
			]
		}
	] as (string | { label: string; items: { title: string; href: string }[] })[],
	// What I'm deliberately not focusing on. `link` (optional) turns `linkText` inside `text` into a link.
	notDoing: [
		{ text: 'Decision models, such as Jev.', linkText: 'Jev', link: 'https://en.wikipedia.org/wiki/Jev_(AI_model)' }
	] as { text: string; linkText?: string; link?: string }[]
};
