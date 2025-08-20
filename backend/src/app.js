import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import userRoutes from './routes/userRoutes.js'
import itemRoutes from './routes/itemRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/items', itemRoutes)

app.get('/', (req, res) => {
  res.send('Inventory Management API is running')
})

export default app
