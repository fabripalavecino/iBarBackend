import mongoose, { Document, Schema } from "mongoose";

export interface IWorkReport extends Document {
    barID: mongoose.Types.ObjectId;
    businessID: mongoose.Types.ObjectId;
    client_id: mongoose.Types.ObjectId;
    eventDate: Date;
    minimumGuests: number;
    guestsPrediction: number;
    selectedMenu: mongoose.Types.ObjectId;
    pricePerGuest: number;
    payedItems: { name: string; price: number }[];
    notes: string[];
    workDate: Date;
    eventName: string;
    income: number;
    outcome: number;
    revenue: number;
    drinksPayment: number;
    employeesPayment: number;
    drinksList: mongoose.Types.ObjectId[]; // Item entity
    cloneList: mongoose.Types.ObjectId[]; // clone from drinksList
}

const WorkReportSchema = new Schema<IWorkReport>({
    barID: { type: Schema.Types.ObjectId, required: true, ref: "Bar" },
    businessID: { type: Schema.Types.ObjectId, required: true, ref: "Business" },
    client_id: { type: Schema.Types.ObjectId, required: true, ref: "Client" },
    eventDate: { type: Date, required: true },
    minimumGuests: { type: Number },
    guestsPrediction: { type: Number },
    selectedMenu: { type: Schema.Types.ObjectId, ref: "Menu" },
    pricePerGuest: { type: Number },
    payedItems: [{ name: String, price: Number }],
    notes: [String],
    workDate: { type: Date, required: true },
    eventName: { type: String, required: true },
    income: { type: Number },
    outcome: { type: Number },
    revenue: { type: Number },
    drinksPayment: { type: Number },
    employeesPayment: { type: Number },
    drinksList: [{ type: Schema.Types.ObjectId, ref: "Item" }],
    cloneList: [{ type: Schema.Types.ObjectId, ref: "Item" }],
});

export default mongoose.model<IWorkReport>("WorkReport", WorkReportSchema);
