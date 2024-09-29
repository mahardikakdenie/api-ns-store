import { Router } from 'express';
import { createProduct, getProducts } from '../controllers/product_controllers';

const router = Router();

// router.get('/', getProducts);
router.post('/', createProduct);
router.get('/', getProducts)

export default router;
