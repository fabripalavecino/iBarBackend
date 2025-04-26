import mongoose, { Document, Schema } from "mongoose";

export interface IEmployee extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  barID: mongoose.Types.ObjectId;
  businessID: mongoose.Types.ObjectId;
  isDeleted: boolean;
}

const EmployeeSchema = new Schema<IEmployee>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  barID: { type: Schema.Types.ObjectId, required: true, ref: "Bar" },
  businessID: { type: Schema.Types.ObjectId, required: true, ref: "Business" },
  isDeleted: { type: Boolean, default: false },
});

export default mongoose.model<IEmployee>("Employee", EmployeeSchema);
