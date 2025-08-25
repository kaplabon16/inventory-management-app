import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as GitHubStrategy } from 'passport-github2'
import prisma from './db.js'
import { generateToken } from '../utils/jwt.js'

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await prisma.user.findUnique({ where: { email: profile.emails[0].value } })
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: profile.displayName || profile.emails[0].value,
          email: profile.emails[0].value,
          password: '', // OAuth users don't need password
          role: 'user'
        }
      })
    }
    const token = generateToken({ id: user.id, email: user.email, role: user.role })
    done(null, { user, token })
  } catch (err) {
    done(err, null)
  }
}))

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${process.env.BACKEND_URL}/auth/github/callback`
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let email = profile.emails?.[0]?.value
    if (!email) return done(new Error('GitHub email not found'), null)
    let user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      user = await prisma.user.create({
        data: { name: profile.username, email, password: '', role: 'user' }
      })
    }
    const token = generateToken({ id: user.id, email: user.email, role: user.role })
    done(null, { user, token })
  } catch (err) {
    done(err, null)
  }
}))

passport.serializeUser((data, done) => done(null, data))
passport.deserializeUser((data, done) => done(null, data))
