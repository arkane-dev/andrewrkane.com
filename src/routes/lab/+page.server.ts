import { listLab } from '#lib/server/lab.js';

export const load = () => ({ entries: listLab() });
