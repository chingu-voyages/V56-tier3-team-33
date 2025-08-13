import { Router } from "express";
import { getExperts, getExpertDetails } from "./experts-handlers.js";

const expertsRouter = Router();
expertsRouter.get("/", getExperts);
expertsRouter.get("/:id", getExpertDetails);

export default expertsRouter;
