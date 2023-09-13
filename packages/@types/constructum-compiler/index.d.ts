import { ISyntax } from 'constructum-interfaces';
export { SQL, EF } from './core/index.js';
export { trpcClient } from './client';
export { appRouter } from './server/index.js';
export declare const build: (syntaxModel: ISyntax) => Promise<string>;
