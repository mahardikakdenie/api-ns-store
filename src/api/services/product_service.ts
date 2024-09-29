import mongoose, { PipelineStage } from "mongoose";
import { ProductInterface } from "../interfaces/ProductInterface";
import { createProduct, getRawProducts } from "../repositories/product_repository";

export const createProductService = async (product: ProductInterface) => {
    return await createProduct(product);
};

export const getProductService = async (payloads: { name?: string; _id?: string }) => {
    const pipelines: PipelineStage[] = [
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $project: {
              name: 1,
              user: {
                $arrayElemAt: ["$user", 0]
              },
              price: 1,
              description: 1,
              inStock: 1,
            }
          }
    ];

    if (payloads.name) {
        const matchStage: PipelineStage.Match = {
            $match: { name: payloads.name }
        }

        pipelines.push(matchStage);
    }

    if (payloads._id) {
        const matchStage: PipelineStage.Match = {
            $match: { _id: new mongoose.Types.ObjectId(payloads._id) }
        };

        pipelines.push(matchStage);
    }

    return await getRawProducts(pipelines);
};
