import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import prisma from "../lib/prisma";

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      issuer: "",
      audience: "",
    },
    async (payload, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: payload.sub,
          },
          select: {
            id: true,
            email: true,
          },
        });

        if (user) return done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

export default passport;
