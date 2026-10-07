import { error } from '@sveltejs/kit';
import { getDeepDive, listDeepDives } from '#lib/server/lab.js';

// Prerender one page per Lab entry that has a deep dive.
export const entries = () => listDeepDives().map((e) => ({ slug: e.slug }));

export const load = async ({ params }) => {
	const entry = await getDeepDive(params.slug);
	if (!entry) error(404, 'Lab entry not found');
	return entry;
};
