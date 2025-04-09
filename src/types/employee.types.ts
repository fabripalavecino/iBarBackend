import mongoose from "mongoose";

export interface EmployeeRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface EmployeeUpdateRequest extends Partial<EmployeeRequest> {}

export interface IEmployee extends mongoose.Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  barID: mongoose.Types.ObjectId;
  businessID: mongoose.Types.ObjectId;
}