import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  allowedHeaders: ["Content-Type", "Accept", "Authorization"],
  origin: "http://localhost:3000",
  preflightContinue: false,
};
