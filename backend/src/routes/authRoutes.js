import express from 'express'
import passport from 'passport'
import { register, login, profile } from '../controllers/authController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

// Local auth
router.post('/register', register)
router.post('/login', login)
router.get('/profile', authMiddleware, profile)

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const { token } = req.user
  res.redirect(`${process.env.FRONTEND_URL}/oauth?token=${token}`)
})

// GitHub OAuth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }))
router.get('/github/callback', passport.authenticate('github', { session: false }), (req, res) => {
  const { token } = req.user
  res.redirect(`${process.env.FRONTEND_URL}/oauth?token=${token}`)
})

export default router
