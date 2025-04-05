import mongoose from "mongoose";

export interface IBar extends mongoose.Document {
    name: string;
    businessID: mongoose.Types.ObjectId;
    barLogo: string;
    drinksList: mongoose.Types.ObjectId[];
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface BarRequest {
    name: string;
    businessID: string;
    barLogo: string;
    drinksList?: string[]; 
}