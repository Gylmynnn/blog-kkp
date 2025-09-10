import { Hono } from "hono";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { CommentsController } from "../controllers/comments.controller";

const comments = new Hono().basePath("/v1")
    .get("/comments", CommentsController.getAll)
    .get("/:id/comments", CommentsController.getByPost)
    .get("/comments/:id", CommentsController.getById)
    .use("*", AuthMiddleware)
    .post("/comments", CommentsController.create)
    .put("/comments/:id", CommentsController.update)
    .delete("/comments/:id", CommentsController.delete)

export default comments
