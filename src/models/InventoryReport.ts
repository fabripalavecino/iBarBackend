import mongoose, { Document, Schema } from "mongoose";

export interface IInventoryReport extends Document {
    businessID: mongoose.Types.ObjectId;
    barID: mongoose.Types.ObjectId;
    reportDate: Date;
    items: { itemID: mongoose.Types.ObjectId; quantity: number }[];
}

const InventoryReportSchema = new Schema<IInventoryReport>({
    businessID: { type: Schema.Types.ObjectId, required: true, ref: "Business" },
    barID: { type: Schema.Types.ObjectId, required: true, ref: "Bar" },
    reportDate: { type: Date, required: true },
    items: [
        {
            itemID: { type: Schema.Types.ObjectId, ref: "Item", required: true },
            quantity: { type: Number, required: true },
        },
    ],
});

export default mongoose.model<IInventoryReport>("InventoryReport", InventoryReportSchema);
