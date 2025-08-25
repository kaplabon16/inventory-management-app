import express from 'express'
import session from 'express-session'
import passport from 'passport'
import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import inventoryRoutes from './routes/inventoryRoutes.js'
import itemRoutes from './routes/itemRoutes.js'
import { errorHandler } from './middleware/errorMiddleware.js'
import './config/passport.js'

dotenv.config()

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 5045
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Session middleware (cookie-based auth)
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  }
}))

app.use(passport.initialize())
app.use(passport.session())

// Mount routes under /api to match project expectation
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/inventories', inventoryRoutes)
app.use('/api/items', itemRoutes)

// Healthcheck
app.get('/', (req, res) => res.send('🚀 Inventory backend is running'))

// OAuth success example route (optional)
app.get('/api/auth/success', (req, res) => {
  // If passport set req.user and you need to redirect to frontend
  if (req.user) {
    return res.redirect(`${FRONTEND_URL}/oauth-success`)
  }
  res.redirect(`${FRONTEND_URL}/login`)
})

// Socket.IO setup — no external `cors` package used
const io = new Server(server, {
  // keep default behavior; in production make sure frontend and backend are same origin or configure reverse proxy
})

app.use((req, res, next) => { req.io = io; next() })

io.on('connection', socket => {
  console.log('✅ Socket connected:', socket.id)
})

app.use(errorHandler)

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})
