import express from "express";
import "reflect-metadata";
import routes from "./routes";

/**
 * bootstrap application
 *
 * @return
 */
(async () => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(routes);

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(
      `[${process.env.NODE_ENV}] Server is up and running on PORT :${PORT}`
    );
  });
})();
