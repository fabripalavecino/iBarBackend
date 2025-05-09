import mongoose, { Document, Schema } from "mongoose";

export interface IFile extends Document {
  businessID: mongoose.Types.ObjectId;
  barID: mongoose.Types.ObjectId;
  fileName: string;
  fileType: string;
  fileURL: string;
  uploadedAt: Date;
  isDeleted: boolean;
}

const FileSchema = new Schema<IFile>({
  businessID: { type: Schema.Types.ObjectId, required: true, ref: "Business" },
  barID: { type: Schema.Types.ObjectId, required: true, ref: "Bar" },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileURL: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});

export default mongoose.model<IFile>("File", FileSchema);
