import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
    businessID: mongoose.Types.ObjectId;
    assignedTo: mongoose.Types.ObjectId;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
    dueDate: Date;
}

const TaskSchema = new Schema<ITask>({
    businessID: { type: Schema.Types.ObjectId, required: true, ref: "Business" },
    assignedTo: { type: Schema.Types.ObjectId, required: true, ref: "Employee" },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
    dueDate: { type: Date },
});

export default mongoose.model<ITask>("Task", TaskSchema);
