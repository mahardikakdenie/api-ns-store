import { Router } from "express";
import { login } from "../controllers/auth_controllers";

const router = Router();

router.post('/', login);

export default router;
