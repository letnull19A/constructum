import { trpcClient } from 'constructum-compiler'
import express from 'express'

export const compilerRoute = express.Router()

compilerRoute.post('/:id/:syntax/build', async (req, res) => {

    const { id, syntax } = req.params 

    if (id === undefined && syntax === undefined) {
        return res.status(400).send('bad input data!')
    }

    const response = await trpcClient('localhost', 5490).build.query(JSON.stringify({ name: 'Alex' }))

    res.status(200).send(response)
})

compilerRoute.get('/:id/build/:syntax', (req, res) => {
    res.status(200).send('{ }')
})
