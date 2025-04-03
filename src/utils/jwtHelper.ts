import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (userId: string, email: string, role?: string): string => {
    const payload = { id: userId, email, role };
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "2h" });
};
