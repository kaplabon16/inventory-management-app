import express from "express"
import session from "express-session"
import passport from "passport"
import dotenv from "dotenv"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"

import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import inventoryRoutes from "./routes/inventoryRoutes.js"
import itemRoutes from "./routes/itemRoutes.js"
import { errorHandler } from "./middleware/errorMiddleware.js"

import "./config/passport.js"

dotenv.config()

const app = express()
const server = http.createServer(app)

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"

// 🔹 Allowed origins - Updated with correct domains
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://inventory-management-app-pied-gamma.vercel.app",
  "https://inventory-management-h1e9m8bpa-kaplabon16s-projects.vercel.app",
  // Add any other Vercel preview URLs you might have
]

// Add environment-based origin
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL)
}

// 🔹 Enhanced CORS setup
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true)
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      console.log("❌ Blocked by CORS:", origin)
      callback(new Error(`Not allowed by CORS: ${origin}`))
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 200
}))

// Handle preflight requests
app.options('*', cors())

// Body parser
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET || "supersecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}))

// Passport
app.use(passport.initialize())
app.use(passport.session())

// Add request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.get('origin')}`)
  next()
})

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/inventories", inventoryRoutes)
app.use("/api/items", itemRoutes)

// Health check
app.get("/", (req, res) => res.json({ 
  message: "🚀 Inventory backend is running",
  timestamp: new Date().toISOString(),
  cors: allowedOrigins
}))

// Test endpoint for debugging
app.get("/api/test", (req, res) => {
  res.json({
    message: "API is working",
    origin: req.get('origin'),
    headers: req.headers
  })
})

// Socket.io with enhanced CORS
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
})

app.use((req, res, next) => { req.io = io; next() })

io.on("connection", socket => {
  console.log("✅ Socket connected:", socket.id)
  
  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id)
  })
})

// Error handler (must be last)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
  console.log(`✅ Frontend URL: ${FRONTEND_URL}`)
  console.log(`✅ Allowed origins:`, allowedOrigins)
})