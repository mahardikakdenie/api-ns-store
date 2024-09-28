import { PipelineStage } from "mongoose";
import bcrypt from 'bcrypt';
import { getRawUser } from "../repositories/user_repository";
import { loginRepo } from "../repositories/auth_repository";

export const loginService = async (payload: { email: string; password: string }) => {
    const pipeline: PipelineStage[] = [];
    
    if (payload.email) {
        const matchStage: PipelineStage.Match = {
            $match: { email: payload.email }
        };
        pipeline.push(matchStage);
    }


    const user = await getRawUser(pipeline);

    if (user.length === 0) {
        throw new Error("The user with this email address was not found. Please check the email and try again.");
    }

    const matchPassword = await bcrypt.compareSync(payload.password, user[0].password);

    if (!matchPassword) {
        throw new Error("Incorrect password. Please verify your password and try again.");
    }

    const authLogin = loginRepo(user[0]);

    return authLogin;
};
