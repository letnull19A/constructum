import { MongoDBWrapper } from 'constructum-dbs'
import { router, publicProcedure } from './trpc.router'
import z from 'zod'
import { User } from 'constructum-schemes'

export const appRouter = router({
    ping: publicProcedure
        .input(z.string())
        .query(async (opts) => {
            return opts.input
        }),
    identity: publicProcedure
        .input(z.object({ mongoConnection: z.string(), userLogin: z.string() }))
        .query(async (opts) => {

            const { input } = opts

            const mongo = new MongoDBWrapper(input.mongoConnection)

            const connection = await mongo.connect()

            User

            mongo.disconnect()

            return input
        })
})

export type AppRouter = typeof appRouter