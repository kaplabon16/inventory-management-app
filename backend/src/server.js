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

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
  })
)

// Body parser
app.use(express.json())

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'supersecret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: 'lax' } // adjust secure=true for HTTPS
  })
)

// Passport
app.use(passport.initialize())
app.use(passport.session())

// --- API ROUTES ---
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/inventories', inventoryRoutes)
app.use('/api/items', itemRoutes)

// Error handling
app.use(errorMiddleware)

// Start server
const PORT = process.env.PORT || 5045
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
