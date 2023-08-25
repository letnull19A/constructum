import { router, publicProcedure } from './trpc.router'
import { TRPCError } from '@trpc/server'

const appRouter = router({
    build: publicProcedure
        .input((val: unknown) => {

            if (typeof val === 'string') return val

            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: `Invalid input: ${typeof val} is not a project`,
              })
        })
        .query(async (opts) => {

            const { input } = opts

            console.log(input)

            return ''
        })
})

export type AppRouter = typeof appRouter