import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

// Extend Request interface untuk menambahkan properti user
export interface CustomRequest extends Request {
    user?: string | JwtPayload;
}
