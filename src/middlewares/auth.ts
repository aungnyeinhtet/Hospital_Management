import passport from "../lib/passport";

export const auth = passport.authenticate("jwt", { session: false });
