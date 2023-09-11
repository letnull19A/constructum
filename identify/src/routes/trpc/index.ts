import { initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import { trpcController } from '../../controllers'
import { z } from 'zod'

const trpc = initTRPC.create()

const router = trpc.router({
	ping: trpc.procedure.input(z.string()).query(({ input }) => {
		return trpcController.ping(input)
	})
})

type AppRouter = typeof router

const trpcRouter = trpcExpress.createExpressMiddleware({
	router
})

export { AppRouter, trpcRouter }
