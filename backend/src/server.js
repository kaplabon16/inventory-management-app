import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import passport from 'passport'
import session from 'express-session'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import inventoryRoutes from './routes/inventoryRoutes.js'
import itemRoutes from './routes/itemRoutes.js'
import { errorMiddleware } from './middleware/errorMiddleware.js'
import './config/passport.js'

dotenv.config()
const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(session({ secret: process.env.SESSION_SECRET || 'supersecret', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/inventories', inventoryRoutes)
app.use('/items', itemRoutes)
app.use(errorMiddleware)

const PORT = process.env.PORT || 5045
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
