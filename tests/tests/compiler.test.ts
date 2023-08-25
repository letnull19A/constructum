import { expect, describe, it, jest } from '@jest/globals'
import { IProject } from 'constructum-interfaces'
import { EF } from 'constructum-compiler'
import project from '../json/project.mock.json'

describe('compiler testing EF', () => {
    
    
    it('project is not null', async () => {
        expect(project).not.toBeNull()
    })
    
    it('project is not undefined', async () => {
        expect(project).not.toBeUndefined()
    })
    
    it('normalize project name', async () => {
        const ef = new EF(project)
        ef.normalizeProjectName()

        expect(ef.normalizedProjectName).toEqual('Test')
    })

    it('normalize directories', async () => {
        const ef = new EF(project)
        const directories = ef.normalizeDirectories(['System.IO', 'System.Threading'])

        expect(directories).toEqual('using System.IO;\nusing System.Threading;\n\n')
    })

    it('normalize string-like types (varchar)', async () => {
        const ef = new EF(project)
        const readyType = ef.normalizeType('varchar')

        expect(readyType).toEqual('string')
    })

    it('normalize string-like types (String)', async () => {
        const ef = new EF(project)
        const readyType = ef.normalizeType('String')

        expect(readyType).toEqual('string')
    })

    it('normalize string-like types (Text)', async () => {
        const ef = new EF(project)
        const readyType = ef.normalizeType('Text')

        expect(readyType).toEqual('string')
    })

    it('normalize number-like types (Number)', async () => {
        const ef = new EF(project)
        const readyType = ef.normalizeType('Number')

        expect(readyType).toEqual('int')
    })

})