import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { router } from '../trpc/trpc.router'

const appRouter = router({
    
})

export type AppRouter = typeof appRouter