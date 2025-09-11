import { Hono } from "hono";
import { AuthMiddleware } from "../middleware/auth.middleware.js";
import { UserController } from "../controllers/users.controller.js";

const users = new Hono().basePath("/v1")
    .get("/users", UserController.getAll)
    .get("/users/:id", UserController.getById)
    .put("/users/:id", AuthMiddleware, UserController.update)
    .delete("/users/:id", AuthMiddleware, UserController.delete)

export default users
