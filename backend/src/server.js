import express from 'express'
import authRoutes from './routes/authRoutes.js'

const app = express()
app.use(express.json())

// Make sure the route prefix matches
app.use('/api/auth', authRoutes)

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`)
})
