import { Request, Response } from "express";
import { loginService } from "../services/auth_service";
import { authSchema } from "../schema/auth_schema";

const authRulesValidate = authSchema;
export const login = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        
        const { error, value } = authRulesValidate.validate(body);

        if (error) {

			res.status(400).json({ message: error.details });
			return;
        }
        const token = await loginService(value);

        res.status(201).json({ message: 'success', data: token });
    } catch (error: unknown) {
        const err = error as Error;
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
};
