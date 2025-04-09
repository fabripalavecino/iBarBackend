// src/models/Item.ts
import mongoose, { Schema } from "mongoose";
import { IItem } from "../types/item.types";

const ItemSchema = new Schema<IItem>({
    barID: { type: Schema.Types.ObjectId, required: true, ref: "Bar" },
    businessID: { type: Schema.Types.ObjectId, required: true, ref: "Business" },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String },
});

export default mongoose.model<IItem>("Item", ItemSchema);
