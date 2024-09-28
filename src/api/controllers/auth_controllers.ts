import { Request, Response } from "express";
import { loginService } from "../services/auth_service";

export const login = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        console.log('boydt -> ', body);
        const token = await loginService(body);

        res.status(201).json({ message: 'User created', data: token });
    } catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error creating user' });
    }
};
