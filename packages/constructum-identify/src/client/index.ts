import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../server'

export const trpcClient = (address: string) => createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: address
        })
    ]
})