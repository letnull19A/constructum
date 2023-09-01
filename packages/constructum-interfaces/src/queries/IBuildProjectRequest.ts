import { IProject } from ".."

export interface IBuildProjectRequest {
    syntaxName: string
    projectData: IProject
}