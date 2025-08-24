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

const allowedOrigins = [ FRONTEND_URL ]

app.use(cors({ origin: allowedOrigins, credentials:true }))
app.use(express.json())
app.use(session({ secret: process.env.SESSION_SECRET, resave:false, saveUninitialized:false }))
app.use(passport.initialize())
app.use(passport.session())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/inventories", inventoryRoutes)
app.use("/api/items", itemRoutes)
app.use(errorHandler)

app.get("/", (req,res)=>res.send("Inventory backend running"))

const io = new Server(server, { cors:{ origin:allowedOrigins, credentials:true }})
app.use((req,res,next)=>{ req.io = io; next() })
io.on("connection", socket => console.log("Socket connected:", socket.id))

const PORT = process.env.PORT || 5000
server.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))
