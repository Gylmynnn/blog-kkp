import { Hono } from 'hono';
import { cors } from 'hono/cors';
import auth from './routes/auth.route.js';
import posts from './routes/posts.route.js';
import comments from './routes/comments.route.js';
import users from './routes/users.route.js';
import swagger from './routes/swagger.route.js';
import { runAutoMigration } from './database/auto-migrate.js';
// Run auto-migration on startup (only in production)
runAutoMigration().catch(console.error);
const app = new Hono();
app.use("*", cors({
    origin: "*",
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "options"],
    allowHeaders: ["Content-Type", "Authorization"],
}));
app.route("/swagger", swagger);
app.get("/", (c) => c.text("Blog KKP Backend, Dibuat dengan Hono + Typscript + DrizleORM"));
app.route("/api", auth);
app.route("/api", posts);
app.route("/api", comments);
app.route("/api", users);
export default app;
