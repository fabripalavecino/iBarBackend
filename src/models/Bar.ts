import mongoose, { Schema, Document } from "mongoose";
import { IBar } from "../types/bar.types";


const BarSchema = new Schema<IBar>(
    {
        businessID: { type: Schema.Types.ObjectId, required: true, ref: "Business" },
        barLogo: { type: String, required: true }, // ✅ Required barLogo
        drinksList: [{ type: Schema.Types.ObjectId, ref: "Item", default: [] }], // ✅ Optional, default []
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model<IBar>("Bar", BarSchema);
