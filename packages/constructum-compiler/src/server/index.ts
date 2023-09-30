import { TRPCError } from '@trpc/server'
import { router, publicProcedure } from './trpc.router'
import { IBuildProjectRequest, IProject } from 'constructum-interfaces'
import z from 'zod'
import { EF, SQL } from '..'

const syntax = ['ef', 'sql']

export const appRouter = router({
    build: publicProcedure
        .input(z.object({
            syntaxName: z.string(), 
            projectData: z.string()
        }))
        .query(async (opts) => {

            const { input } = opts
            const data = input as IBuildProjectRequest

            const project = JSON.parse(data.projectData) as IProject

            if (syntax.indexOf(data.syntaxName) === -1) {
                const error: TRPCError = {
                    name: `cannot find syntax`,
					code: 'BAD_REQUEST',
					message: `syntax ${data.syntaxName} is not found`
                }

                return error
            }

            if (project === undefined) {
                const error: TRPCError = {
                    name: 'cannot load project content',
                    code: 'BAD_REQUEST',
                    message: 'project data is not valid or undefined'
                }
            }

            let buildText = ''

            switch(data.syntaxName) {
                case syntax[0]:
                    const ef = new EF(project)
                    ef.build()

                    return ef.buildText
                    break
                case syntax[1]:
                    const sql = new SQL(project)
                    sql.build()

                    return sql.buildText
                    break
            }

            return buildText
        })
})

export type AppRouter = typeof appRouter