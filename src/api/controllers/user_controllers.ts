import { Request, Response } from 'express';
import {
	createUserService,
	getDataUserService,
} from '../services/user_service';
import { userSchema } from '../schema/user_schema';
const userSchemaValidation = userSchema;

export const createUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const body = req.body;

		const { error, value } = userSchemaValidation.validate(body);

		if (error) {
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
