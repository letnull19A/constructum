import { IProject, ISyntax } from 'constructum-interfaces';
export declare class SQL implements ISyntax {
    private readonly _originProject;
    private readonly buildPath;
    private readonly deafultPath;
    private _buildText;
    constructor(project: IProject);
    normalizeFieldName(fieldName: string): string;
    normalizeProjectName(): string;
    linkDirectories(): string[];
    normalizeDirectories(directories: string[]): string;
    get normalizedProjectName(): string;
    normalizeType(type: string): string;
    normalizeName(name: string): string;
    build(): void;
    get buildText(): string;
}
