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

// --- Dynamic CORS setup for credentials ---
const corsOptions = {
  origin: function(origin, callback) {
    if (!origin || origin === FRONTEND_URL) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}

app.use(cors(corsOptions))

// Handle preflight requests
app.options("*", cors(corsOptions))

// --- Middleware ---
app.use(express.json())
app.use(session({ 
  secret: process.env.SESSION_SECRET || "keyboardcat", 
  resave: false, 
  saveUninitialized: false 
}))
app.use(passport.initialize())
app.use(passport.session())

// --- Routes ---
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/inventories", inventoryRoutes)
app.use("/api/items", itemRoutes)
app.use(errorHandler)

app.get("/", (req, res) => res.send("Inventory backend running"))

// --- Socket.IO ---
const io = new Server(server, { cors: corsOptions })
app.use((req, res, next) => { req.io = io; next() })
io.on("connection", socket => console.log("Socket connected:", socket.id))

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
