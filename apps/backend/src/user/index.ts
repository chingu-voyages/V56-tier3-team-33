// route config goes here
import { Router } from "express";
import { login, registerExpert } from "./user-handlers.js";

const userRouter = Router();
userRouter.post("/register-expert", registerExpert);
userRouter.post("/login", login);

export default userRouter;
