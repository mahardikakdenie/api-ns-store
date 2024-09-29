import { Response } from 'express';
import { CustomRequest } from '../interfaces/CustomRequestInterface';
import { createProductService, getProductService } from '../services/product_service';
import { productSchema } from '../schema/product_schema';
import { JwtPayload } from 'jsonwebtoken';
import { ProductInterface } from '../interfaces/ProductInterface';

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

        res.status(200).json({ message: 'success', data: product });
    } catch (error: unknown) {
        const err = error as Error;
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
};

export const getProducts = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const query = req.query;

        const products: ProductInterface[] = await getProductService(query); 
        res.status(201).json({ message: 'success', data: products }); // Returning the response
    } catch (error: unknown) {
        const err = error as Error;
        console.error(err.message);
        res.status(500).json({ message: err.message, data: {} }); // Ensure you return the response here
    }
}
