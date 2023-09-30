import { IProject, ISyntax } from 'constructum-interfaces';
import { IBuildProjectResponse } from 'constructum-interfaces/queries/IBuildProjectResponse';
export declare class EF implements ISyntax {
    private _buildText;
    private _normalizedProjectName;
    private _originProject;
    constructor(project: IProject);
    normalizeDirectories(directories: Array<string>): string;
    normalizeProjectName(): string;
    linkDirectories(): Array<string>;
    get normalizedProjectName(): string;
    get buildText(): Array<IBuildProjectResponse>;
    normalizeType(typeName: string): string;
    normalizeFieldName(name: string): string;
    build(): void;
}
