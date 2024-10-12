import mongoose, { PipelineStage } from 'mongoose';
import { ProductInterface } from '../interfaces/ProductInterface';
import {
	createProduct,
	getRawProducts,
	updateProduct,
} from '../repositories/product_repository';

export const createProductService = async (product: ProductInterface) => {
	return await createProduct(product);
};

export const getProductService = async (payloads: {
	name?: string;
	_id?: string;
}) => {
	const pipelines: PipelineStage[] = [
		{
			$lookup: {
				from: 'users',
				localField: 'userId',
				foreignField: '_id',
				as: 'user',
			},
		},
		{
			$lookup: {
				from: 'media',
				localField: 'mediaId',
				foreignField: '_id',
				as: 'media',
			},
		},
		{
			$project: {
				name: 1,
				user: {
					$arrayElemAt: ['$user', 0],
				},
				price: 1,
				description: 1,
				inStock: 1,
				media: {
					$arrayElemAt: ['$media', 0],
				},
			},
		},
	];

	if (payloads.name) {
		const matchStage: PipelineStage.Match = {
			$match: { name: payloads.name },
		};

		pipelines.push(matchStage);
	}

	if (payloads._id) {
		const matchStage: PipelineStage.Match = {
			$match: { _id: new mongoose.Types.ObjectId(payloads._id) },
		};

		pipelines.push(matchStage);
	}

	return await getRawProducts(pipelines);
};

export const updateProductMedia = async (
	productId: string,
	mediaId: string
) => {
	const payload = {
		mediaId: new mongoose.Types.ObjectId(mediaId),
	};

	return await updateProduct(productId, payload);
};

export const updateProductServices = async (
	productId: string,
	productPayload: {
		name?: string;
		description?: string;
		mediaId?: string;
		price?: string;
		category?: string;
		inStock?: boolean;
	}
) => {

	return await updateProduct(productId, productPayload);
};
