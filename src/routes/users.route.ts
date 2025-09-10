import { Hono } from "hono";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { UserController } from "../controllers/users.controller";

const users = new Hono().basePath("/v1")
    .get("/users", UserController.getAll)
    .get("/users/:id", UserController.getById)
    .put("/users/:id", AuthMiddleware, UserController.update)
    // .delete("/users/:id", AuthMiddleware, UserController.delete)

export default users
