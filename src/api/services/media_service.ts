import { UploadResponseInterface } from '../interfaces/MediaInterface';
import { saveMedia } from '../repositories/media_repository';

export const saveMediaService = async (media: UploadResponseInterface, type: string) => {
  console.log('media -> ', media);
  console.log('type -> ', type);

  const payload = {
    type,
    url: media?.display_url,
    meta: media,
  }

  return await saveMedia(payload);
};
