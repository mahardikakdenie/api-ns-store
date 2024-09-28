
import User from "../models/user";
import { PipelineStage } from 'mongoose'; 

export const createUserRepo = async (userData: unknown) => {
    return await User.create(userData);
};

export const getRawUser = async (payload: PipelineStage[]) => {
    try {
        const pipeline: PipelineStage[] = [...payload];

        if (pipeline.length === 0) {
            return await User.find();
        }

        return await User.aggregate(pipeline);
    } catch (error) {
        console.error('Error in getRawUser:', error);
        throw new Error(`Failed to fetch data: ${error}`);
    }
};
