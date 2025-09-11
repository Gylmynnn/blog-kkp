import { SupabaseUpload } from "./index.js";
export class AssetActions {
    static async UploadUserAvatar(buffer) {
        return await SupabaseUpload(buffer, "users");
    }
    static async UploadPosts(buffer) {
        return await SupabaseUpload(buffer, "posts");
    }
}
