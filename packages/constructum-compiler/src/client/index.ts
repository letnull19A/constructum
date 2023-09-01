import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../server'

export const trpcClient = (host: string, port: number) => createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: `http://${host}:${port}`
        })
    ]
})