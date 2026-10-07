import { listPosts } from '#lib/server/posts.js';
import { listLab } from '#lib/server/lab.js';

export const load = () => ({ posts: listPosts().slice(0, 3), lab: listLab().slice(0, 3) });
