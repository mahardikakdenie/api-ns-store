import { createUserRepo, getDataRepo } from "../repositories/user_repository";
import bcrypt from 'bcrypt';

export const createUserService = async (userObj: { name: string, email: string, password: string; }) => {
    if (userObj?.password) {
        const hashedPassword = await bcrypt.hash(userObj.password, 10);
        userObj.password = hashedPassword
    }
    return await createUserRepo(userObj);
};

export const getDataUserService = async (payload: any) => {
    const pipeline: any = [];

    if (payload.email) {
        if (pipeline.length === 0) {
            pipeline.push({ $match: {} });
        }
        pipeline[0].$match.email = payload.email;
    }

    return await getDataRepo(pipeline);
};
