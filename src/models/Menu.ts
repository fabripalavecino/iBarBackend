import mongoose, { Document, Schema } from "mongoose";
export interface IMenu extends Document {
    barID: mongoose.Types.ObjectId;
    name: string;
    items: { itemID: mongoose.Types.ObjectId; quantity: number }[];
}

const MenuSchema = new Schema<IMenu>({
    barID: { type: Schema.Types.ObjectId, required: true, ref: "Bar" },
    name: { type: String, required: true },
    items: [
        {
            itemID: { type: Schema.Types.ObjectId, ref: "Item", required: true },
            quantity: { type: Number, required: true },
        },
    ],
});

export default mongoose.model<IMenu>("Menu", MenuSchema);
