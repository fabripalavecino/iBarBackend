import mongoose, { Schema } from "mongoose";
import { IBar } from "../types/bar.types";
import "./Item";


const BarSchema = new Schema<IBar>(
    {
        name: { type: String, required: true },
        businessID: { type: Schema.Types.ObjectId, required: true, ref: "Business" },
        barLogo: { type: String, required: true },
        drinksList: [{ type: Schema.Types.ObjectId, ref: "Item", default: [] }], // Optional, default []
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

BarSchema.index({ isDeleted: 1 });

export default mongoose.model<IBar>("Bar", BarSchema);
