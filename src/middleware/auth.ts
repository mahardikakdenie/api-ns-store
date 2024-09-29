import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomRequest } from '../api/interfaces/CustomRequestInterface';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

/**
 * Middleware function to authenticate JWT tokens.
 * 
 * This function checks for a JWT in the Authorization header of the request.
 * If the token is present and valid, it extracts the user information from the token
 * and attaches it to the request object for subsequent middleware or route handlers.
 * If the token is missing or invalid, it responds with an appropriate error message
 * and prevents further processing of the request.
 *
 * @param {CustomRequest} req - The request object, which extends the Express request.
 * @param {Response} res - The response object from Express.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {void} Returns nothing. Calls next() to proceed to the next middleware or route handler,
 *                 or sends a response with an error status and message.
 *
 * @throws {Error} Throws an error if token verification fails.
 */
export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.split(' ')[1]; // get token from header Authorization

    if (!token) {
        // only send response, without return;
        res.status(401).json({ message: 'Access Denied: No Token Provided' });
        return; // out from function and continue to `next()`
    }

    try {
        // Varification token
        const verified = jwt.verify(token, SECRET_KEY) as string | JwtPayload;
        req.user = verified; // save user to object request
        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: 'Invalid Token' });
    }
};
