import { SupabaseUpload } from "./index";
import { UploadResponse } from "./type";

export class AssetActions {
    static async UploadUserAvatar(buffer: Buffer): Promise<UploadResponse> {
        return await SupabaseUpload(buffer, "users");

    }
    static async UploadPosts(buffer: Buffer): Promise<UploadResponse> {
        return await SupabaseUpload(buffer, "posts");
    }
}
