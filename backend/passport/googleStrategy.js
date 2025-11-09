import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { User } from '../model/user.model.js';
dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const existing = await User.findOne({ googleId: profile.id });
    if (existing) return done(null, existing);

    const email = profile.emails?.[0]?.value;
    let user = null;
    if (email) user = await User.findOne({ email });
    if (user) {
      user.googleId = profile.id;
      user.isVerified = true;
      await user.save();
      return done(null, user);
    }

    const created = await User.create({
      name: profile.displayName || 'No Name',
      email,
      googleId: profile.id,
      isVerified: true,
    });
    done(null, created);
  } catch (err) {
    done(err, null);
  }
}));
