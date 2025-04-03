import mongoose, { Document, Schema } from "mongoose";

interface IShift extends Document {
    barID: mongoose.Types.ObjectId;
    businessID: mongoose.Types.ObjectId;
    reportID: mongoose.Types.ObjectId;
    employeeID: mongoose.Types.ObjectId;
    dateOfWork: Date;
    startTime: Date;
    endTime: Date;
    shiftDuration: { hours: number; minutes: number };
    hourPayment?: number;
    dailyPayment?: number;
    travelRefund?: number;
    totalPayment: number;
}

const ShiftSchema = new Schema<IShift>({
    barID: { type: Schema.Types.ObjectId, required: true, ref: "Bar" },
    businessID: { type: Schema.Types.ObjectId, required: true, ref: "Business" },
    reportID: { type: Schema.Types.ObjectId, required: true, ref: "WorkReport" },
    employeeID: { type: Schema.Types.ObjectId, required: true, ref: "Employee" },
    dateOfWork: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    shiftDuration: { hours: Number, minutes: Number },
    hourPayment: { type: Number },
    dailyPayment: { type: Number },
    travelRefund: { type: Number },
    totalPayment: { type: Number, required: true },
});

export default mongoose.model<IShift>("Shift", ShiftSchema);
