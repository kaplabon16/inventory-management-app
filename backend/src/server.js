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

const FRONTEND_URL = process.env.FRONTEND_URL || "https://inventory-management-app-pied-gamma.vercel.app"

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization","X-Requested-With"],
}))

// Handle preflight requests manually
app.options("*", (req,res) => {
  res.header("Access-Control-Allow-Origin", FRONTEND_URL)
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization,X-Requested-With")
  res.header("Access-Control-Allow-Credentials", "true")
  res.sendStatus(204)
})

app.use(express.json())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "none"
  }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/inventories", inventoryRoutes)
app.use("/api/items", itemRoutes)
app.use(errorHandler)

app.get("/", (req,res)=>res.send("Inventory backend running"))

const io = new Server(server, { cors:{ origin: FRONTEND_URL, credentials:true }})
app.use((req,res,next)=>{ req.io = io; next() })
io.on("connection", socket => console.log("Socket connected:", socket.id))

const PORT = process.env.PORT || 5000
server.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))
