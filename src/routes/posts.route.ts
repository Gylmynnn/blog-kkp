import { Hono } from "hono";
import { PostsController } from "../controllers/posts.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

const posts = new Hono().basePath("/v1")
    .get("/posts", PostsController.getAll)
    .get("/posts/:id", PostsController.getById)
    .get("/me/posts", AuthMiddleware, PostsController.getByAuthorId)
    .post("/posts", AuthMiddleware, PostsController.create)
    .put("/posts/:id", AuthMiddleware, PostsController.update)
    .delete("/posts/:id", AuthMiddleware, PostsController.delete)
export default posts
