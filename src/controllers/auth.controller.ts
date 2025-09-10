import { Context } from "hono";
import bcrypt from "bcryptjs";
import { sign } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";
import { AuthModel } from "../model/auth.model";
import { ResFormmater } from "../lib/utils/response";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../lib/dto/auth";
import { UserModel } from "../model/users.model";

const JWT_SECRET = process.env.JWT_SECRET;
export class AuthController {
    static async register(c: Context) {
        try {
            const { username, email, password } = await c.req.json<RegisterRequest>();
            if (!username || !email || !password) return c.json(ResFormmater.failed("Username, Email dan password wajib diisi", 400), 400);

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) return c.json(ResFormmater.failed("Format email tidak valid", 400), 400);

            const existingUser = await UserModel.findByEmail(email);
            if (existingUser) return c.json(ResFormmater.failed("Email sudah digunakan", 400), 400);

            if (password.length < 6) return c.json(ResFormmater.failed("Password minimal 6 karakter"), 400);
            const hashPw = await bcrypt.hash(password, 10)
            const defaultAvatar = "https://avatar.iran.liara.run/public";
            const user = await AuthModel.register(username, email, hashPw, defaultAvatar);
            const response: RegisterResponse = {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar ?? "",
                createdAt: String(user.createdAt)
            }
            return c.json(ResFormmater.success(response, "Registerasi Berhasil", 201), 201);
        } catch (err) {
            return c.json(ResFormmater.failed("Server Error" + err, 500), 500);
        }

    }
    static async login(c: Context) {
        try {
            const { email, password } = await c.req.json<LoginRequest>();
            if (!email || !password) return c.json(ResFormmater.failed("Email dan password wajib diisi", 400), 400);

            if (password.length < 6) return c.json(ResFormmater.failed("Password minimal 6 karakter"), 400);
            const user = await AuthModel.login(email);
            if (!user) return c.json(ResFormmater.failed("Tidak dapat menemukan akun dengan email tersebut. Silakan periksa kembali", 401), 401);
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) return c.json(ResFormmater.failed("Kata sandi yang Anda masukkan tidak sesuai. Silakan coba lagi.", 401), 401);

            const payload: JWTPayload = {
                userId: user.id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
            }
            const token: string = await sign(
                payload,
                JWT_SECRET!,
                "HS256"
            );

            const response: LoginResponse = {
                id: user.id,
                username: user.username,
                avatar: user.avatar ?? "",
                email: user.email,
                token: token,
                createdAt: user.createdAt!,
            }
            return c.json(ResFormmater.success(response, "Login berhasil"), 200);
        } catch (err) {
            return c.json(ResFormmater.failed("Server Error" + err, 500), 500);
        }

    }
}
