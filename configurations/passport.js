import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import models from "../models/models.js";

// === Google OAuth Strategy ===
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Gunakan URL absolut sesuai yang didaftarkan di Authorized redirect URIs Google Cloud Console
      callbackURL: "http://localhost:5000/user/auth/google/callback", 
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await models.User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        user = await models.User.findOne({ email: profile.emails[0].value });

        if (user) {
          user.googleId = profile.id;
          await user.save();
          return done(null, user);
        }

        user = await models.User.create({
          email: profile.emails[0].value,
          googleId: profile.id,
        });

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

// === JWT Strategy ===
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      const user = await models.User.findById(jwt_payload.id);
      
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;