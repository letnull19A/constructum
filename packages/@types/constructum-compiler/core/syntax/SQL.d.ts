import { IProject, ISyntax } from 'constructum-interfaces';
import { IBuildProjectResponse } from 'constructum-interfaces/queries/IBuildProjectResponse';
export declare class SQL implements ISyntax {
    private readonly _originProject;
    private _buildText;
    private _normalizedProjectName;
    constructor(project: IProject);
    normalizeFieldName(fieldName: string): string;
    normalizeProjectName(): string;
    linkDirectories(): string[];
    normalizeDirectories(directories: string[]): string;
    get normalizedProjectName(): string;
    normalizeType(type: string): string;
    normalizeName(name: string): string;
    build(): void;
    get buildText(): Array<IBuildProjectResponse>;
}
