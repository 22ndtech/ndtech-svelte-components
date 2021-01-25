import {writable} from 'svelte/store';

const _context = new writable({});
export const Context = _context;