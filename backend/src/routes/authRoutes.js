// routes/authRoutes.js
import express from 'express'
import passport from 'passport'
import { register, login, oauthCallback } from '../controllers/authController.js'

const router = express.Router()

// Local Auth
router.post('/register', register)
router.post('/login', login)

// Google OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  oauthCallback
)

// GitHub OAuth
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
)

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login', session: false }),
  oauthCallback
)

export default router
