// import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
// import { CompilerRouter } from 'constructum-compiler'
import express from 'express'
import { $log as logger } from '@tsed/logger'

export const compilerRoute = express.Router()

//const trpc = createTRPCProxyClient<CompilerRouter>({
//    links: [
//        httpBatchLink({
//            url: 'http://127.0.0.1:2004' 
//        })
//    ]
//})

compilerRoute.post('/:id/build/:syntax', async (req, res) => {

    const { id, syntax } = req.params 

    if (id === undefined && syntax === undefined) {
        return res.status(400).send('bad input data!')
    }

  //  const result = await trpc.makeProject.query({ name: 'letnull19a' })

    //res.status(200).send(`${result}`)
    res.status(200)
})

compilerRoute.get('/:id/build/:syntax', (req, res) => {
    res.status(200).send('{ }')
})
