import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (
    userId: string,
    email: string,
    userType: "barOwner" | "barManager",
    businessID: string,
    barID?: string
): string => {
    const payload = { id: userId, email, role: userType, businessID, ...(barID && { barID }) };
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "2h" });
};
