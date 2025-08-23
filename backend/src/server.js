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

// 🔹 Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://inventory-management-h1e9m8bpa-kaplabon16s-projects.vercel.app",
  "https://inventory-management-app-git-main-kaplabon16s-projects.vercel.app", // backup Vercel preview
]

// 🔹 Apply CORS FIRST
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman) or valid origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS: " + origin))
    }
  },
  credentials: true,
}))

// 🔹 Attach socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }
})

// Attach io to req
app.use((req, res, next) => {
  req.io = io
  next()
})

// Body parser
app.use(express.json())

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET || "supersecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  },
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
app.get("/", (req, res) => {
  res.send("🚀 Inventory backend is running")
})

// Socket.io events
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id)
})

// Start server
const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))
