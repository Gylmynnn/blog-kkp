import { MiddlewareHandler } from "hono";
import { verify } from "hono/jwt";

const JWT_SECRET = process.env.JWT_SECRET;

export const AuthMiddleware: MiddlewareHandler = async (c, next) => {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return c.json({ success: false, message: "Unauthorized" }, 401);
    try {
        const payload = await verify(token, JWT_SECRET!);
        c.set("user", payload);
        await next();
    } catch (err: any) {
        return c.json({ success: false, message: "Invalid or expired token" + err.message }, 401);
    }
};
