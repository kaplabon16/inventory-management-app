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

const FRONTEND_URLS = [
  "http://localhost:5173",
  "https://inventory-management-app-pied-gamma.vercel.app",
  "https://inventory-management-h1e9m8bpa-kaplabon16s-projects.vercel.app",
  "https://inventory-management-1urgfgkat-kaplabon16s-projects.vercel.app"
]

// CORS setup
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || FRONTEND_URLS.some(url => origin.includes(url))) {
      callback(null, true)
    } else {
      console.log("❌ Blocked by CORS:", origin)
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}))

// Body parser
app.use(express.json())

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET || "supersecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
  }
}))

// Passport
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/inventories", inventoryRoutes)
app.use("/api/items", itemRoutes)

// Error handler
app.use(errorHandler)

// Health check
app.get("/", (req, res) => res.send("🚀 Inventory backend is running"))

// OAuth success redirect
app.get("/api/auth/success", (req, res) => {
  const token = req.user?.token
  const redirectUrl = FRONTEND_URLS[0] + "/login" + (token ? `?token=${token}` : "")
  res.redirect(redirectUrl)
})

// Socket.io
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URLS,
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
  }
})

app.use((req, res, next) => { req.io = io; next() })

io.on("connection", socket => {
  console.log("✅ Socket connected:", socket.id)
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))
