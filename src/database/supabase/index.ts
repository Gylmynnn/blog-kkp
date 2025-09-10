import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from '../index';
import { UploadResponse } from './type';


export async function SupabaseDelete(assetId: string): Promise<void> {
    const { error } = await supabase.storage.from("storage").remove([assetId]);
    if (error) throw error;
}

export async function SupabaseUpload(buffer: Buffer, folder: string): Promise<UploadResponse> {
    const uniqueName = `${folder}/${uuidv4()}.webp`;
    const webpBuffer = await sharp(buffer)
        .resize(1080)
        .webp({ quality: 80 })
        .toBuffer()

    const { error } = await supabase.storage
        .from('storage')
        .upload(uniqueName, webpBuffer, {
            contentType: 'image/webp',
            upsert: false,
        })

    if (error) throw error
    const { data } = supabase.storage.from('storage').getPublicUrl(uniqueName)
    return {
        assetId: uniqueName,
        url: data.publicUrl,
    }
}
