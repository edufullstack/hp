import express from "express";
import routes from "./routers/index";
import { handleError } from "./utils/error";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "https://hospitalapp-production.up.railway.app",
    credentials: true,
    methods: "GET,POST,OPTIONS,PUT,DELETE",
    allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept",
  })
);

app.use("/api/v1", routes);

app.use(handleError);

export default app;
