import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"

dotenv.config()

const app = express()
const prisma = new PrismaClient()

// Middleware
app.use(express.json())

// ✅ Configure CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend (Vite/React)
      "https://inventory-management-app-git-main-kaplabon16s-projects.vercel.app", // your Vercel frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
)

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" })
})

// Example Inventory CRUD
app.get("/api/inventories", async (req, res) => {
  try {
    const inventories = await prisma.inventory.findMany()
    res.json(inventories)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch inventories" })
  }
})

app.post("/api/inventories", async (req, res) => {
  try {
    const { name, quantity } = req.body
    const inventory = await prisma.inventory.create({
      data: { name, quantity },
    })
    res.json(inventory)
  } catch (error) {
    res.status(500).json({ error: "Failed to create inventory" })
  }
})

// Server listen
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})
