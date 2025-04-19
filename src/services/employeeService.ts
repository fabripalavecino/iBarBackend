import Employee from "../models/Employee";
import { EmployeeRequest } from "../types/employee.types";

export const createEmployee = async (data: EmployeeRequest) => {
  return await Employee.create(data);
};

export const getEmployees = async (barID: string) => {
  return await Employee.find({ barID, isDeleted: false });
};

export const getEmployeeById = async (id: string) => {
  return await Employee.findOne({ _id: id, isDeleted: false });
};

export const updateEmployee = async (id: string, data: Partial<EmployeeRequest>) => {
  return await Employee.findByIdAndUpdate(id, data, { new: true });
};

export const deleteEmployee = async (id: string) => {
  return await Employee.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};
