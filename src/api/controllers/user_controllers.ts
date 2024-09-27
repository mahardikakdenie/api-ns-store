import { Request, Response } from 'express';
import {
	createUserService,
	getDataUserService,
} from '../services/user_service';
import Joi from 'joi';

const userSchema = Joi.object({
	name: Joi.string().min(3).max(30).required(),
	password: Joi.string().min(6).required(),
	email: Joi.string().email().required(),
});

export const createUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const body = req.body;

		const { error, value } = userSchema.validate(body);

		if (error) {
			// Jika validasi gagal, kembalikan error ke client
			res.status(400).json({ message: error.details });
			return;
		}

		const { name, password, email } = value;

		const users = await createUserService({ name, password, email });
		res.status(201).json({ message: 'User created', data: users });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error creating user' });
	}
};

export const getUserData = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const params = req.query;
		const users = await getDataUserService(params);
		res.status(201).json({ message: 'success', data: users });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error });
	}
};
