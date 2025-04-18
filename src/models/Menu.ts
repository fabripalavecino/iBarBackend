import mongoose, { Document, Schema } from "mongoose";

export interface IMenu extends Document {
  barID: mongoose.Types.ObjectId;
  businessID: mongoose.Types.ObjectId;
  name: string;
  price: number;
  drinksList: {
    itemID: mongoose.Types.ObjectId;
    quantity: number;
  }[];
}

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
});

export default mongoose.model<IMenu>("Menu", MenuSchema);
