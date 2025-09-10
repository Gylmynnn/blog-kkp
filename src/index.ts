import { Context, Hono } from 'hono'
import { cors } from 'hono/cors'
import auth from './routes/auth.route'
import posts from './routes/posts.route';
import comments from './routes/comments.route';
import users from './routes/users.route';
import swagger from './routes/swagger.route';
import { UserController } from './controllers/users.controller';

const app = new Hono()
    .use(
        "*", cors({
            origin: "*",
            credentials: true,
            allowMethods: ["GET", "POST", "PUT", "DELETE", "options"],
            allowHeaders: ["Content-Type", "Authorization"],
        })
    )

    .get("/users", UserController.getAll)

    .route("/swagger", swagger)
    .get("/", (c: Context) => c.text("Blog KKP Backend, Dibuat dengan Hono + Typscript + DrizleORM"))
    .route("/api", auth)
    .route("/api", posts)
    .route("/api", comments)
    .route("/api", users)

export default {
    port: 3000,
    hostname: "0.0.0.0",
    fetch: app.fetch,
};
