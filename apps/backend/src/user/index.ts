// route config goes here
import { Router } from "express";
import { registerExpert } from "./user-handlers.js";

const userRouter = Router();
userRouter.post("/register-expert", registerExpert);

export default userRouter;
