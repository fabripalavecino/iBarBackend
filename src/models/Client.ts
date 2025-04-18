import mongoose, { Document, Schema } from "mongoose";

export interface IClient extends Document {
  barID: mongoose.Types.ObjectId;
  businessID: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

const ClientSchema = new Schema<IClient>({
  barID: { type: Schema.Types.ObjectId, required: true, ref: "Bar" }, // ✅ add this
  businessID: { type: Schema.Types.ObjectId, required: true, ref: "Business" },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
});

export default mongoose.model<IClient>("Client", ClientSchema);
