import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as GitHubStrategy } from 'passport-github2'
import prisma from '../prisma/client.js'

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
}, async (accessToken, refreshToken, profile, done)=>{
  let user = await prisma.user.findUnique({ where:{ googleId: profile.id }})
  if(!user){
    user = await prisma.user.create({ data:{ googleId: profile.id, email: profile.emails[0].value, name: profile.displayName }})
  }
  done(null,user)
}))

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK
}, async (accessToken, refreshToken, profile, done)=>{
  let user = await prisma.user.findUnique({ where:{ githubId: profile.id }})
  if(!user){
    const email = profile.emails?.[0]?.value || `${profile.username}@github.com`
    user = await prisma.user.create({ data:{ githubId: profile.id, email, name: profile.displayName || profile.username }})
  }
  done(null,user)
}))
