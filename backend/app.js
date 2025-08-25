import express from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import inventoryRoutes from './routes/inventoryRoutes.js'
import itemRoutes from './routes/itemRoutes.js'
import discussionRoutes from './routes/discussionRoutes.js'
import { errorMiddleware } from './middleware/errorMiddleware.js'
import './config/passport.js'

dotenv.config()
const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use(express.json())
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/inventories', inventoryRoutes)
app.use('/items', itemRoutes)
app.use('/discussions', discussionRoutes)

app.use(errorMiddleware)

export default app
