import http from 'http'
import { Server } from 'socket.io'
import app from './app.js'

const server = http.createServer(app)
const io = new Server(server, { cors: { origin: process.env.FRONTEND_URL } })

io.on('connection', socket => {
  console.log('User connected', socket.id)
  socket.on('joinInventory', inventoryId => socket.join(inventoryId))
  socket.on('newComment', data => io.to(data.inventoryId).emit('newComment', data))
  socket.on('disconnect', () => console.log('User disconnected', socket.id))
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
