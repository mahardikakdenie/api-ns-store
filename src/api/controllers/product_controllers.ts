import { Response } from 'express';
import { CustomRequest } from '../interfaces/CustomRequestInterface';
import { createProductService, getProductService, updateProductServices } from '../services/product_service';
import { productSchema } from '../schema/product_schema';
import { JwtPayload } from 'jsonwebtoken';
import { ProductInterface } from '../interfaces/ProductInterface';
import { successResponse, errorResponse } from 'helper-transformer';

const productSchemaValidate = productSchema;

export const createProduct = async (req: CustomRequest, res: Response) => {
    try {
        const body = req.body;
        const userId = (req.user as JwtPayload).userId;
        const payload = {
            ...body,
            userId: userId ?? '',
        }
        const { error, value } = productSchemaValidate.validate(payload);

        if (error) {
            res.status(400).json({ message: error.details });
            return;
        }

        const product = await createProductService(value);

        successResponse(res, product);
    } catch (error: unknown) {
        const err = error as Error;
        console.error(err.message);
        errorResponse(res, err.message, 500);
    }
};

export const getProducts = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const query = req.query;

        const products: ProductInterface[] = await getProductService(query); 
         // Returning the response
        successResponse(res, products);
    } catch (error: unknown) {
        const err = error as Error;
        console.error(err.message);
        errorResponse(res, 'error');
    }
}

export const updateProduct = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const productId = req.params.productId;
        const body = req?.body;

        await updateProductServices(productId, body);

        successResponse(res, "Data Successfully update");
    } catch (error: unknown) {
        const err = error as Error;
        console.error(err.message);
        errorResponse(res, err.message); // Ensure you return the response here
    }
};
