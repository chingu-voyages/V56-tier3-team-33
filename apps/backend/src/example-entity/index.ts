// route config goes here
import { Router } from "express";
import { stubHandler } from "./entity-handlers.js";

const entityRouter = Router();
entityRouter.get("/", stubHandler);

export default entityRouter;
