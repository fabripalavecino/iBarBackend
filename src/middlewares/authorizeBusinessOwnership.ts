import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const authorizeBusinessOwnership = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ message: "Unauthorized: No user ID in token" });
            return;
        }

        const user = await User.findById(userId);

        if (!user || user.userType !== "barOwner" || !user.businessID) {
            res.status(403).json({ message: "Forbidden: Not a business owner or no business associated" });
            return;
        }

        const businessIdFromRequest = req.body.businessID;

        if (!businessIdFromRequest || user.businessID.toString() !== businessIdFromRequest) {
            res.status(403).json({ message: "Forbidden: You do not own this business" });
            return;
        }

        next();
    } catch (error) {
        console.error("Authorization error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
