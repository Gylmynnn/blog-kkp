import { verify } from "hono/jwt";
import { ResFormmater } from "../lib/utils/response.js";
const JWT_SECRET = process.env.JWT_SECRET;
export const AuthMiddleware = async (c, next) => {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token)
        return c.json(ResFormmater.failed("Unauthorized", 401), 401);
    try {
        const payload = await verify(token, JWT_SECRET);
        c.set("user", payload);
        await next();
    }
    catch (err) {
        return c.json(ResFormmater.failed("Token tidak valid atau kadaluarsa"), 401);
    }
};
