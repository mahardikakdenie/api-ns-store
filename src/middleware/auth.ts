import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// Extend Request interface untuk menambahkan properti user
export interface CustomRequest extends Request {
    user?: string | JwtPayload;
}

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.split(' ')[1]; // Ambil token dari header Authorization

    if (!token) {
        // Hanya kirim response, tanpa return
        res.status(401).json({ message: 'Access Denied: No Token Provided' });
        return; // Keluar dari fungsi agar tidak melanjutkan ke `next()`
    }

    try {
        // Verifikasi token
        const verified = jwt.verify(token, SECRET_KEY) as string | JwtPayload;
        req.user = verified; // Simpan data user di objek request
        next(); // Lanjut ke middleware berikutnya atau controller
    } catch (error) {
        console.log(error);
        // Hanya kirim response, tanpa return
        res.status(403).json({ message: 'Invalid Token' });
    }
};
