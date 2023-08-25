import { ISyntax } from 'constructum-interfaces';
export { SQL, EF } from './core/index.js';
export declare const build: (syntaxModel: ISyntax) => Promise<string>;
