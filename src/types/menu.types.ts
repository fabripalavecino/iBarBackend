import mongoose, { Document } from "mongoose";

export interface MenuRequest {
    barID: string;
    businessID: string;
    name: string;
    price: number;
    drinksList: {
      itemID: string;
      quantity: number;
    }[];
}


export interface IMenu extends Document {
  barID: mongoose.Types.ObjectId;
  businessID: mongoose.Types.ObjectId;
  name: string;
  price: number;
  drinksList: {
    itemID: mongoose.Types.ObjectId;
    quantity: number;
  }[];
  isDeleted: boolean; // ✅ added for soft delete
}
  