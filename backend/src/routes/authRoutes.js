import express from 'express'
import passport from 'passport'
import { register, login, logout, me, oauthCallback } from '../controllers/authController.js'

const router = express.Router()

// Local register/login
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', me)

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/auth/login', session: true }),
  oauthCallback
)

// GitHub OAuth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }))
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/api/auth/login', session: true }),
  oauthCallback
)

export default router
