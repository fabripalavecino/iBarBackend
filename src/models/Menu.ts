import mongoose, { Document, Schema } from "mongoose";

interface IMenu extends Document {
    businessID: mongoose.Types.ObjectId;
    name: string;
    items: { itemID: mongoose.Types.ObjectId; quantity: number }[];
}

const MenuSchema = new Schema<IMenu>({
    businessID: { type: Schema.Types.ObjectId, required: true, ref: "Business" },
    name: { type: String, required: true },
    items: [
        {
            itemID: { type: Schema.Types.ObjectId, ref: "Item", required: true },
            quantity: { type: Number, required: true },
        },
    ],
});

export default mongoose.model<IMenu>("Menu", MenuSchema);
