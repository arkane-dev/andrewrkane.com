import { listPosts } from '#lib/server/posts.js';

export const load = () => ({ posts: listPosts().slice(0, 3) });
