import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'
import passport from 'passport'
import './config/passport.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import inventoryRoutes from './routes/inventoryRoutes.js'
import itemRoutes from './routes/itemRoutes.js'
import { errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173", // local dev
      "https://inventory-management-app-pied-gamma.vercel.app" // Vercel frontend
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
})

// Attach io to requests
app.use((req, res, next) => { req.io = io; next() })

// ✅ Configure CORS properly for REST API
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://inventory-management-app-pied-gamma.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

app.use(express.json())
app.use(passport.initialize())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/inventories', inventoryRoutes)
app.use('/api/items', itemRoutes)

app.use(errorHandler)

io.on('connection', (socket) => {
  console.log('Socket connected', socket.id)
})

const PORT = process.env.PORT || 5045
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
