import express from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github2'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

const app = express()
const PORT = process.env.PORT || 5045

// Replace these with your deployed frontend URL
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://your-frontend.vercel.app'

app.use(express.json())

// CORS setup
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}))

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, sameSite: 'lax' } // for HTTPS set secure: true
}))

// Passport setup
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((obj, done) => done(null, obj))

// GitHub OAuth
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${process.env.BACKEND_URL}/auth/github/callback`
}, (accessToken, refreshToken, profile, done) => done(null, profile)))

// Google OAuth
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`
}, (accessToken, refreshToken, profile, done) => done(null, profile)))

// Routes
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }))
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: FRONTEND_URL + '/login', session: true }),
  (req, res) => { res.redirect(FRONTEND_URL + '/?token=' + req.user.id) }
)

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: FRONTEND_URL + '/login', session: true }),
  (req, res) => { res.redirect(FRONTEND_URL + '/?token=' + req.user.id) }
)

// Dummy user route
app.get('/api/users/me', (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' })
  res.json({ id: req.user.id, name: req.user.displayName || req.user.username, email: req.user.emails?.[0]?.value || '' })
})

// Example inventory route
app.get('/api/inventories', (req, res) => {
  res.json([
    { id: '1', title: 'Inventory 1', description: 'Sample inventory', ownerId: req.user?.id || '1', items: [] },
    { id: '2', title: 'Inventory 2', description: 'Another inventory', ownerId: req.user?.id || '2', items: [] },
  ])
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
