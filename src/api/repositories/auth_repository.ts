import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';
export const loginRepo = async (user: { email: string; password: string, _id: string }) => {
    const token = jwt.sign(
        {
            userId: user._id,
            email: user.email,
        },
        SECRET_KEY,
        { expiresIn: '1h' } // Token berlaku selama 1 jam
    );

    return token;
}
