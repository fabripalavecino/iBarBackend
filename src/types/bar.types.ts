import mongoose from "mongoose";

export interface IBar extends mongoose.Document {
    businessID: mongoose.Types.ObjectId;
    barLogo: string;
    drinksList: mongoose.Types.ObjectId[];
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface BarRequest {
    businessID: string; // Expecting a string ID in API requests
    barLogo?: string;
    drinksList?: string[]; // Expecting an array of string IDs in API requests
}