import express from "express";
import exampleEntityRouter from "./example-entity/index.js";

const app = express();

app.use(express.json());
app.use(function logRequests(req, _, next) {
  console.info(`${req.method} initiated on ${req.path}`);
  next();
});

// adding different routers here
app.use("/v1", exampleEntityRouter);

app.use(function notFound(_, res) {
  res.status(404).json({ message: "Route not found" });
});

export default app;
