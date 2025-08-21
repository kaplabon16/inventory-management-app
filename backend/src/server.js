const express = require('express')
const cors = require('cors')
require('dotenv').config()
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const inventoryRoutes = require('./routes/inventoryRoutes')
const itemRoutes = require('./routes/itemRoutes')
const errorHandler = require('./middleware/errorMiddleware')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/inventories', inventoryRoutes)
app.use('/api/items', itemRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
