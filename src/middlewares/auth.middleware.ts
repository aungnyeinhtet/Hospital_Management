import passport from "../lib/passport";

export const authMiddleware = passport.authenticate("jwt", { session: false });
