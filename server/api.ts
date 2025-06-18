import express from 'express'
import cors from 'cors';
import { initTRPC } from '@trpc/server'
import { createExpressMiddleware } from '@trpc/server/adapters/express'

const app = express()
const port = 3000

const t = initTRPC.create()

const appRouter = t.router({
    hi: t.procedure.query(() => {
        return "hello"
    }),
    logToServer: t.procedure.input(v => {
        if (typeof v === "string") return v
        throw new Error('invalid input')
    }).mutation(req => {
        console.log(`client says: ${req.input}`)
    })
})


app.get('/ping', (req, res) => {
    console.log('pong')
    res.send({ 'message': 'pong' })
})

app.use('/trpc', createExpressMiddleware({ router: appRouter }))

app.use(cors({ origin: 'http://localhost:5173' }))

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})