import { Schema, model, Types, Document } from "mongoose";

export interface InventoryItem {
  itemID: Types.ObjectId;
  quantity: number;
}

export interface IInventoryReport extends Document {
  businessID: Types.ObjectId;
  barID: Types.ObjectId;
  reportDate: Date;
  items: InventoryItem[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const InventoryItemSchema = new Schema<InventoryItem>(
  {
    itemID: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const InventoryReportSchema = new Schema<IInventoryReport>(
  {
    businessID: { type: Schema.Types.ObjectId, required: true, ref: "Business" },
    barID: { type: Schema.Types.ObjectId, required: true, ref: "Bar" },
    reportDate: { type: Date, required: true },
    items: { type: [InventoryItemSchema], required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<IInventoryReport>("InventoryReport", InventoryReportSchema);
