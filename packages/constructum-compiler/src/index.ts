import { ISyntax } from 'constructum-interfaces'

export { SQL, EF } from './core/index.js'

export const build = async (syntaxModel: ISyntax): Promise<string> => {
    syntaxModel.build()

    return syntaxModel.buildText
}