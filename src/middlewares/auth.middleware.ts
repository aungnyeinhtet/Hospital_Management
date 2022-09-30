import passport from "../lib/passport";

export const authMiddleware = passport.authenticate(
  "jwt",
  { session: false },
  //   (err, user, info) => {
  //     throw new Unauthorized();
  //   },
);
