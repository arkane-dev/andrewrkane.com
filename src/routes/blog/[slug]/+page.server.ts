import { error } from '@sveltejs/kit';
import { getPost, listPosts } from '#lib/server/posts.js';

// Prerender one page per published post.
export const entries = () => listPosts().map((p) => ({ slug: p.slug }));

export const load = async ({ params }) => {
	const post = await getPost(params.slug);
	if (!post) error(404, 'Post not found');
	const all = listPosts();
	const i = all.findIndex((p) => p.slug === params.slug);
	return { ...post, newer: all[i - 1] ?? null, older: all[i + 1] ?? null };
};
