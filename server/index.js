import express from 'express'
import cors from 'cors'
import { router } from './routes.js'
const app = express()

app.use(cors())

app.use(express.json())

app.use('/todos',router)

app.listen(3000, () => {
    console.log('listening on http://locahost:3000')
})