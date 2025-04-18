import Employee from "../models/Employee";
import { EmployeeRequest } from "../types/employee.types";
import { IEmployee } from "../types/employee.types";

export const createEmployee = async (
  data: EmployeeRequest,
  barID: string,
  businessID: string
): Promise<IEmployee> => {
  const newEmployee = new Employee({
    ...data,
    barID,
    businessID
  });
  return await newEmployee.save();
};

export const getEmployeesByBar = async (
  barID: string
): Promise<IEmployee[]> => {
  return await Employee.find({ barID });
};

export const getEmployeeById = async (
  id: string,
  barID: string
): Promise<IEmployee | null> => {
  return await Employee.findOne({ _id: id, barID });
};

export const updateEmployee = async (
  id: string,
  data: EmployeeRequest,
  barID: string
): Promise<IEmployee | null> => {
  return await Employee.findOneAndUpdate({ _id: id, barID }, data, { new: true });
};

export const deleteEmployee = async (
  id: string,
  barID: string
): Promise<void> => {
  await Employee.findOneAndDelete({ _id: id, barID });
};
