import mongoose, { PipelineStage } from 'mongoose';
import Product from '../models/product';

export const createProduct = async (productData: unknown) => {
	console.log(productData);
	const product = await Product.create(productData);

	return product;
};

export const getRawProducts = async (payload: PipelineStage[]) => {
	try {
		const pipeline: PipelineStage[] = [...payload];

		if (pipeline.length === 0) {
			return await Product.find();
		}

		return await Product.aggregate(pipeline);
	} catch (error) {
		console.error('Error in getRawUser:', error);
		throw new Error(`Failed to fetch data: ${error}`);
	}
};

export const updateProduct = async (
	productId: string,
	options: { mediaId?: mongoose.Types.ObjectId }
) => {
	try {
		// Validasi productId apakah valid ObjectId
		if (!mongoose.Types.ObjectId.isValid(productId)) {
			throw new Error('Invalid productId');
		}

		// Temukan produk berdasarkan ID
		const product = await Product.findOneAndUpdate(new mongoose.Types.ObjectId(productId), options);

		return product;
	} catch (error) {
		// Tangani error jika ada
		console.error('Error updating product:', error);
		throw new Error('Failed to update product');
	}
};
