import express from 'express'
import passport from 'passport'
import { register, login, socialLoginRedirect } from '../controllers/authController.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/fail' }), socialLoginRedirect)

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }))
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/auth/fail' }), socialLoginRedirect)

router.get('/fail', (req, res) => res.status(401).json({ message: 'Social login failed' }))

export default router
