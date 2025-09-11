import { Hono } from "hono";
import { AuthController } from "../controllers/auth.controller.js";
const auth = new Hono().basePath("/v1")
    .post("/register", AuthController.register)
    .post("/login", AuthController.login);
export default auth;
