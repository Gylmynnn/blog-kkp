import { MiddlewareHandler } from "hono";
import { verify } from "hono/jwt";
import { ResFormmater } from "../lib/utils/response";

const JWT_SECRET = process.env.JWT_SECRET;

export const AuthMiddleware: MiddlewareHandler = async (c, next) => {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return c.json(ResFormmater.failed("Unauthorized", 401), 401);
    try {
        const payload = await verify(token, JWT_SECRET!);
        c.set("user", payload);
        await next();
    } catch (err: any) {
        return c.json(ResFormmater.failed("Token tidak valid atau kadaluarsa"), 401);
    }
};
