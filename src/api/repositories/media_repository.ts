import { UploadResponseInterface } from "../interfaces/MediaInterface";
import Media from "../models/media";

export const saveMedia = async (media: { url: string; type: string; meta: UploadResponseInterface }) => {
    return await Media.create(media);
};
