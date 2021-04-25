import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import BaseRouter from "./routes";
import config from "@shared/config";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Show routes called in console during development
if (config.nodeEnv === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("short"));
}

// Add APIs
app.use("/api", BaseRouter);

export default app;
