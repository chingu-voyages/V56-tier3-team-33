import express from "express";
import exampleEntityRouter from "./example-entity/index.js";

const { FRONTEND_URL } = process.env;
const app = express();

app.use(express.json());
app.use(function logRequests(req, _, next) {
  console.info(`${req.method} initiated on ${req.path}`);
  next();
});

app.use(function setupCORS(_, res, next) {
  res.header("Access-Control-Allow-Origin", FRONTEND_URL);
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// adding different routers here
app.use("/api/v1", exampleEntityRouter);

app.use(function notFound(_, res) {
  res.status(404).json({ message: "Route not found" });
});

export default app;
