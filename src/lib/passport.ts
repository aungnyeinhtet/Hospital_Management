import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { findByIdOrFail } from "../services/patient.service";

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    },
    async (payload, done) => {
      console.log(process.env.ACCESS_TOKEN_SECRET);

      try {
        const user = await findByIdOrFail(payload.id);

        if (user) return done(null, user);
      } catch (error) {
        done(error, null);
      }
    },
  ),
);

export default passport;
