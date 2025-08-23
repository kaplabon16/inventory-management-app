import express from "express"
import session from "express-session"
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()
const app = express()

// Middleware
app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL, // Vercel frontend
  credentials: true
}))

app.use(session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  }
}))

app.use(passport.initialize())
app.use(passport.session())

// Passport Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`
}, (accessToken, refreshToken, profile, done) => {
  // You should upsert user in NeonDB here
  return done(null, profile)
}))

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((obj, done) => {
  done(null, obj)
})

// Routes
app.get("/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

app.get("/api/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(process.env.FRONTEND_URL) // redirect back to frontend
  }
)

app.get("/api/auth/logout", (req, res) => {
  req.logout(() => {
    res.redirect(process.env.FRONTEND_URL)
  })
})

app.get("/", (req, res) => {
  res.send("✅ Backend is running")
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
