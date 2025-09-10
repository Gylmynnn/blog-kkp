import { Context } from "hono";
import { UserPayloadData } from "../lib/dto/auth";
import { ResFormmater } from "../lib/utils/response";
import { CreateCommentsRequest, UpdateCommentsRequest } from "../lib/dto/comments";
import { CommentModel } from "../model/comments.model";

export class CommentsController {
    static async create(c: Context) {
        try {
            const userAuth = c.get("user") as UserPayloadData
            if (!userAuth) return c.json(ResFormmater.failed("Uanuthorization"), 404)
            const formData = await c.req.formData();
            const content = formData.get("content") as string;
            const postId = formData.get("post_id") as string;
            if (!content || !postId) return c.json(ResFormmater.failed("content dan post id harus diisi"), 400);
            const data: CreateCommentsRequest = {
                content,
                postId: Number(postId),
                authorId: userAuth.userId,
            };
            const response = await CommentModel.create(data)
            return c.json(ResFormmater.success(response, "Create posts successfully", 201), 201);
        } catch (err) {
            return c.json(ResFormmater.failed("Server Error" + err, 500), 500);
        }
    }

    static async update(c: Context) {
        try {
            const userAuth = c.get("user") as UserPayloadData
            if (!userAuth) return c.json(ResFormmater.failed("Unuthorization"), 404)

            const id = Number(c.req.param("id"));
            const record = await CommentModel.getById(id);
            if (!record) return c.json(ResFormmater.failed("Komentar tidak ditemukan", 404), 404);

            const formData = await c.req.formData();
            const content = formData.get("content") as string;

            if (!content) return c.json(ResFormmater.failed("Harus update setidaknya 1 data"), 400);

            const data: UpdateCommentsRequest = {
                id,
                authorId: userAuth.userId,
                content: content || record.content,
            }

            const response = await CommentModel.update(data);
            if (!response) return c.json(ResFormmater.failed("Komentar tidak ditemukan", 404), 404);
            return c.json(ResFormmater.success(response, "Berhasil mengupdate Komentar", 201), 201);
        } catch (err) {
            return c.json(ResFormmater.failed("Server Error" + err, 500), 500);
        }
    }


    static async getByPost(c: Context) {
        try {
            const postId = Number(c.req.param("id"));
            if (!postId) return c.json(ResFormmater.failed("Komentar tidak ditemukan"), 404)
            const response = await CommentModel.getByPost(postId)
            return c.json(ResFormmater.success(response, "Berhasil mendapatkan komentar", 200), 200)
        } catch (err) {
            return c.json(ResFormmater.failed("Server Error" + err, 500), 500);
        }
    }

    static async getAll(c: Context) {
        try {
            const response = await CommentModel.getAll()
            if (!response) return c.json(ResFormmater.failed("Komentar tidak ditemukan"), 404)
            return c.json(ResFormmater.success(response, "Get all comments successfully"), 200);
        } catch (err) {
            return c.json(ResFormmater.failed("Server Error" + err, 500), 500);
        }
    }

    static async getById(c: Context) {
        try {
            const id = Number(c.req.param("id"));
            if (!id) return c.json(ResFormmater.failed("Komentar tidak ditemukan"), 404)
            const response = await CommentModel.getById(id)
            return c.json(ResFormmater.success(response, "Berhasil mendapatkan komentar", 200), 200)
        } catch (err) {
            return c.json(ResFormmater.failed("Server Error" + err, 500), 500);
        }
    }

    static async delete(c: Context) {
        try {
            const id = Number(c.req.param("id"));
            const user = c.get("user") as UserPayloadData;
            if (!user) return c.json(ResFormmater.failed("Unuthorization", 403), 403)
            const response = await CommentModel.delete(id, user.userId, user.isAdmin);
            if (!response) return c.json(ResFormmater.failed("Unuthorization", 403), 403)
            return c.json(ResFormmater.success(response, "Berhasil menghapus postingan", 200), 200);
        } catch (err) {
            return c.json(ResFormmater.failed("Server Error" + err, 500), 500);
        }
    }
}
