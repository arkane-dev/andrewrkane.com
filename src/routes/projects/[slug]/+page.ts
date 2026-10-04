import { error } from '@sveltejs/kit';
import { projects, projectBySlug } from '#lib';

export const entries = () => projects.map((p) => ({ slug: p.slug }));

export const load = ({ params }) => {
	const project = projectBySlug(params.slug);
	if (!project) error(404, 'Project not found');
	return { project };
};
