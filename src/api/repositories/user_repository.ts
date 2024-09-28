
import User from "../models/user";
import mongoose, { PipelineStage } from 'mongoose'; 

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

export const getUserById = async (userId: string) => {
    try {
        // Konversi userId string menjadi ObjectId
        const objectId = new mongoose.Types.ObjectId(userId);

        // Mencari user berdasarkan ObjectId
        const user = await User.findById(objectId);

        // Jika user tidak ditemukan
        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new Error(`Error fetching user: ${error}`);
    }
};
