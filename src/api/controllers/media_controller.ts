import { Request, Response } from 'express';
import { uploadImage } from '../../libs/helpers';
import { saveMediaService } from '../services/media_service';
// Interface untuk mendefinisikan Request yang didukung Multer
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Controller untuk menangani upload image
export const uploadImageController = async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    console.log('halo');
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
    }

    // Memanggil fungsi helper untuk upload image ke Imgbb
    const result = await uploadImage(req);

    const media = await saveMediaService(result.data, req?.body?.type);

    res.status(200).json({ message: 'success', data: media  });
  } catch (error) {
    // Menangani error dan mengirim response error
    res.status(500).json({ message: `Error uploading image: ${error}` });
  }
};
