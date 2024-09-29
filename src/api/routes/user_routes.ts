import { Router } from 'express';
import { createUser, getUserData } from '../controllers/user_controllers';

const router = Router();

router.get('/', getUserData);

router.post('/', createUser);

export default router;
