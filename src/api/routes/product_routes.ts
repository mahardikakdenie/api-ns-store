import { Router } from 'express';
import { createProduct, getProducts, updateProduct } from '../controllers/product_controllers';

const router = Router();

// router.get('/', getProducts);
router.post('/', createProduct);
router.get('/', getProducts)
router.put('/:productId', updateProduct);

export default router;
