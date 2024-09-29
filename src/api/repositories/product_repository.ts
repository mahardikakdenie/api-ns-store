import { PipelineStage } from "mongoose";
import Product from "../models/product";

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
