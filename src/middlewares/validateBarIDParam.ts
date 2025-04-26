import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const validateBarIDParam = (req: Request, res: Response, next: NextFunction): void => {
    const { barID } = req.params;
    if (!barID || !mongoose.Types.ObjectId.isValid(barID)) {
        res.status(400).json({ message: "Invalid or missing barID parameter." });
        return;
    }
    next();
};
