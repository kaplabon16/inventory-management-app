import express from "express"
import session from "express-session"
import passport from "passport"
import dotenv from "dotenv"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"

// Routes
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import inventoryRoutes from "./routes/inventoryRoutes.js"
import itemRoutes from "./routes/itemRoutes.js"
import { errorHandler } from "./middleware/errorMiddleware.js"

// Passport strategies
import "./config/passport.js"

dotenv.config()

const app = express()
const server = http.createServer(app)

// ✅ Setup Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173", // dev
      process.env.FRONTEND_URL  // vercel
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
})

// ✅ Attach socket.io to req
app.use((req, res, next) => {
  req.io = io
  next()
})

// ✅ Express middleware
app.use(express.json())

// ✅ Session for Passport
app.use(session({
  secret: process.env.SESSION_SECRET || "supersecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production", // true on Railway
    sameSite: "lax"
  }
}))

// ✅ Passport init
app.use(passport.initialize())
app.use(passport.session())

// ✅ CORS for API
app.use(cors({
  origin: [
    "http://localhost:5173",   // dev
    process.env.FRONTEND_URL   // vercel
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

// ✅ API Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/inventories", inventoryRoutes)
app.use("/api/items", itemRoutes)

// ✅ Error handler
app.use(errorHandler)

// ✅ Socket.IO events
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id)
  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id)
  })
})

// ✅ Health check
app.get("/", (req, res) => {
  res.send("🚀 Inventory backend is running")
})

// ✅ Start server
const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
