import express from 'express'
import cors from 'cors';

const app = express()
const port = 3000

app.use(cors({ origin: 'http://localhost:5173' }))

app.get('/ping', (req, res) => {
    console.log('pong')
    res.send({ 'message': 'pong' })
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})