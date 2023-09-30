import { IBuildProjectResponse } from "../queries/IBuildProjectResponse"

export interface ISyntax {
    
    /**
     * @example user_name -> UserName (C#)
     * @example user-id -> UserId or user_id
    */
    normalizeFieldName(fieldName: string): string

    /**
     * @example my-best-project -> MyBestProject
     * @example shopDb -> ShopDB
    */
    normalizeProjectName(): string
    
    /**
     * @example text or String or varchar -> string or String (if not recomended is on)
    */
    normalizeType(typeName: string): string

    /**
     * @description Link useful directories for ready project
     * If I need to use some type, linker include him
    */
    linkDirectories(): Array<string>

    /**
     * @example [ 'System.IO', 'System.Threading' ] -> 
     * using System.IO;
     * using System.Threading;
    */
    normalizeDirectories(directories: Array<string>): string
	
    /**
     * @description build project to finally version - text
    */
    build(): void

    /**
     * @description respone array of structured virtual files
    */
    get buildText(): Array<IBuildProjectResponse>

    /**
     * @description return normal project name
    */
    get normalizedProjectName(): string
}