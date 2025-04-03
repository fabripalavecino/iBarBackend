import mongoose, { Document, Schema } from "mongoose";

interface IItem extends Document {
    barID: mongoose.Types.ObjectId;
    businessID: mongoose.Types.ObjectId;
    name: string;
    price: number;
    type: string;
    quantity: number;
    image: string;
}

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
