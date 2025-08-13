import { Router } from "express";
import { getExpertDetails } from "./experts-handlers.js";

const expertsRouter = Router();
expertsRouter.get("/:id", getExpertDetails);

export default expertsRouter;
