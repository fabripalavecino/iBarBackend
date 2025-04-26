// src/types/item.types.ts
import mongoose from "mongoose";

export interface IItem extends mongoose.Document {
    barID: mongoose.Types.ObjectId;
    businessID: mongoose.Types.ObjectId;
    name: string;
    price: number;
    type: string;
    quantity: number;
    image: string;
    isDeleted?: boolean;
}

export interface ItemRequest {
    barID: string;
    businessID: string;
    name: string;
    price: number;
    type: string;
    quantity: number;
    image: string;
}
