import mongoose, { Document, Schema } from "mongoose";

interface IEmployee extends Document {
    firstName: string;
    lastName: string;
    barID: mongoose.Types.ObjectId;
    businessID: mongoose.Types.ObjectId;
}

const EmployeeSchema = new Schema<IEmployee>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    barID: { type: Schema.Types.ObjectId, required: true, ref: "Bar" },
    businessID: { type: Schema.Types.ObjectId, required: true, ref: "Business" },
});

export default mongoose.model<IEmployee>("Employee", EmployeeSchema);
