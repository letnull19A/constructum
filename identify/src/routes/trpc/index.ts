import { initTRPC } from '@trpc/server'
import { trpcController } from '../../controllers'
import { z } from 'zod'

const trpc = initTRPC.create()

const router = trpc.router({
	pingPong: trpc.procedure.input(z.string()).query(({ input }) => {
		return trpcController.pingPong(input)
	}),
	identify: trpc.procedure.input(z.string()).query(({ input }) => {
		return trpcController.identity(input)
	})
})

type AppRouter = typeof router


export { AppRouter, router }
