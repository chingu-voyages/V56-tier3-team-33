import express from "express";

const app = express();

app.use(express.json());
app.use(function logRequests(req, _, next) {
  console.info(`${req.method} initiated on ${req.path}`);
  next();
});

// TODO: add different routers here
app.use("/v1", function stubRoute(req, res) {
  res.send("Hello world!");
});

app.use(function notFound(_, res) {
  res.status(404).json({ message: "Route not found" });
});

export default app;
