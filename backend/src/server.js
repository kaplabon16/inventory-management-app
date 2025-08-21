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
const io = new Server(server,{
  cors:{ origin: process.env.FRONTEND_URL, methods:['GET','POST','PUT'] }
})

app.use((req,res,next)=>{ req.io = io; next() })

app.use(cors())
app.use(express.json())
app.use(passport.initialize())

app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/inventories',inventoryRoutes)
app.use('/api/items',itemRoutes)

app.use(errorHandler)

io.on('connection',(socket)=>{
  console.log('Socket connected', socket.id)
})

const PORT = process.env.PORT || 5000
server.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
