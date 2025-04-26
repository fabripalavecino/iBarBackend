import mongoose, { Document, Schema } from "mongoose";

export interface IBusiness extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    owner_id: mongoose.Types.ObjectId;
    businessNumber: string;
    isDeleted: boolean;
}

const BusinessSchema = new Schema<IBusiness>({
    name: { type: String, required: true },
    owner_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    businessNumber: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
});

BusinessSchema.index({ isDeleted: 1 });


export default mongoose.model<IBusiness>("Business", BusinessSchema);
