import mongoose, { Schema } from "mongoose";
import { IMenu } from "../types/menu.types";

const MenuSchema = new Schema<IMenu>({
  barID: { type: Schema.Types.ObjectId, required: true, ref: "Bar" },
  businessID: { type: Schema.Types.ObjectId, required: true, ref: "Business" },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  drinksList: [
    {
      itemID: { type: Schema.Types.ObjectId, ref: "Item", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  isDeleted: { type: Boolean, default: false },
});

// 🔹 Optional: Add index for performance on queries
MenuSchema.index({ isDeleted: 1 });

export default mongoose.model<IMenu>("Menu", MenuSchema);
