import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define the expected structure of the JWT payload
interface JwtUserPayload {
    id: string;
    email: string;
    role?: string;
}

// Extend Express Request type to include `user`
declare module "express-serve-static-core" {
    interface Request {
        user?: JwtUserPayload;
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Access Denied" });
        return; // Ensure function stops execution
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
            res.status(403).json({ message: "Invalid Token" });
            return; // Ensure function stops execution
        }

        req.user = decoded as JwtUserPayload;
        next(); // Ensure function calls next middleware
    });
};
