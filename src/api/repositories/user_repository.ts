
import User from "../models/user";

export const createUserRepo = async (userData: any) => {
    return await User.create(userData);
};

export const getRawUser = async (payload: Array<{ $match?: any; $group?: any; $sort?: any; }>) => {
    try {
        const pipeline = [];

        console.log('pip -> ', payload);

        const matchStage = payload.find(stage => stage.$match);
        if (matchStage) {
            pipeline.push({ $match: matchStage.$match });
        }

        const groupStage = payload.find(stage => stage.$group);
        if (groupStage) {
            pipeline.push({ $group: groupStage.$group });
        }

        const sortStage = payload.find(stage => stage.$sort);
        if (sortStage) {
            pipeline.push({ $sort: sortStage.$sort });
        }

        if (pipeline.length === 0) {
            return await User.find();
        }

        return await User.aggregate(pipeline);
    } catch (error) {
        console.error('Error in getDataRepo:', error);
        throw new Error(`Failed to fetch data: ${error}`);
    }
};
