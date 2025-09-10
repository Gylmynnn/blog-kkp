import { Context } from "hono";
import { PostsModel } from "../model/posts.model";
import { ResFormmater } from "../lib/utils/response";
import { AssetActions } from "../database/supabase/upload";
import { CreatePostsRequest, UpdatePostsRequest } from "../lib/dto/posts";
import { UserPayloadData } from "../lib/dto/auth";
import { SupabaseDelete } from "../database/supabase/index";
import { UploadResponse } from "../database/supabase/type";


export class PostsController {
    static async create(c: Context) {
        try {
            const userAuth = c.get("user") as UserPayloadData
            if (!userAuth) return c.json(ResFormmater.failed("Uanuthorization"), 404)
            const formData = await c.req.formData();
            if (!formData) return c.json(ResFormmater.failed("Harus mengirim form data"))
            const title = formData.get("title") as string;
            const content = formData.get("content") as string;
            const image = formData.get("image");
            if (!title || !content || !image) return c.json(ResFormmater.failed("Harus terdapat title, content dan image"), 400);
            if (!(image instanceof File)) return c.json(ResFormmater.failed("Image harus berupa file yang valid", 400), 400)
            const imageBuffer = Buffer.from(await image.arrayBuffer());
            const { url, assetId } = await AssetActions.UploadPosts(imageBuffer);
            const data: CreatePostsRequest = {
                title,
                content,
                authorId: userAuth.userId,
                image: url,
                imageId: assetId,
            };
            const response = await PostsModel.create(data)
            return c.json(
                ResFormmater.success(response, "Create posts successfully", 201),
                201
            );
        } catch (err) {
            return c.json(ResFormmater.failed("Server Error" + err, 500), 500);
        }
    }

    static async update(c: Context) {
        try {
            const userAuth = c.get("user") as UserPayloadData
            if (!userAuth) return c.json(ResFormmater.failed("Unuthorization"), 404)
            const id = Number(c.req.param("id"));
            const record = await PostsModel.getById(id);
            if (!record) return c.json(ResFormmater.failed("Postingan tidak ditemukan", 404), 404);
            const formData = await c.req.formData();
            const title = formData.get("title") as string;
            const content = formData.get("content") as string;
            const image = formData.get("image") as File;

            if (!title && !image && !content) return c.json(ResFormmater.failed("Harus update setidaknya 1 data"), 400);
            let imageUrl: UploadResponse | undefined;
            if (image) {
                await SupabaseDelete(record.imageId!)
                const imageBuffer = Buffer.from(await image.arrayBuffer());
                imageUrl = await AssetActions.UploadPosts(imageBuffer);
            }

            const data: UpdatePostsRequest = {
                id,
                title: title || record.title,
                image: imageUrl?.url || record.image!,
                imageId: imageUrl?.assetId || record.imageId!,
                authorId: userAuth.userId,
                content: content || record.content,
            }

            const response = await PostsModel.update(data);
            if (!response) return c.json(ResFormmater.success([], "Postingan tidak ditemukan", 200), 200);
            return c.json(ResFormmater.success(response, "Berhasil mengupdate postingan", 200), 200);
        } catch (err: any) {
            return c.json(ResFormmater.failed(err, 500), 500);
        }
    }
    static async getAll(c: Context) {
        try {
            const response = await PostsModel.getAll()
            return c.json(ResFormmater.success(response, "Get all posts successfully"), 200);
        } catch (err) {
            return c.json(ResFormmater.failed("Server Error" + err, 500), 500);
        }
    }


    static async getByAuthorId(c: Context) {
        try {
            const userAuth = c.get("user") as UserPayloadData | undefined;
            if (!userAuth) return c.json(ResFormmater.failed("Unauthorized", 401), 401);
            const authorId = Number(userAuth.userId);
            if (isNaN(authorId)) return c.json(ResFormmater.failed("Invalid user id", 400), 400);
            const response = await PostsModel.getByAuthorId(authorId);
            if (!response || response.length === 0) return c.json(ResFormmater.success([], "Posts not found", 200), 200);
            return c.json(
                ResFormmater.success(response, "Get posts by author id successfully"),
                200
            );
        } catch (err: any) {
            return c.json(ResFormmater.failed(err.message || "Server Error", 500), 500);
        }
    }


    static async getById(c: Context) {
        try {
            const id = Number(c.req.param("id"));
            const response = await PostsModel.getById(id);
            if (!response) return c.json(ResFormmater.failed("Posts not found", 404), 404);
            return c.json(ResFormmater.success(response, "Get posts by id successfully"), 200);
        } catch (err) {
            return c.json(ResFormmater.failed("Server Error" + err, 500), 500);
        }
    }

    static async delete(c: Context) {
        try {
            const user = c.get("user") as UserPayloadData;
            if (!user) return c.json(ResFormmater.failed("Unuthorization", 403), 403)
            const id = Number(c.req.param("id"))
            const record = await PostsModel.getById(id);
            if (!record) return c.json(ResFormmater.failed("Posts tidak ditemukan", 404), 404)
            const imageId = record.imageId
            if (imageId) await SupabaseDelete(imageId)
            const response = await PostsModel.delete(id, user.userId, user.isAdmin)
            if (!response) return c.json(ResFormmater.failed("Gagal menghapus postingan", 404), 404);
            return c.json(ResFormmater.success(response, "Berhasil menghapus postingan"), 200);
        } catch (err) {
            return c.json(ResFormmater.failed("Server Error" + err, 500), 500);
        }
    }
}
