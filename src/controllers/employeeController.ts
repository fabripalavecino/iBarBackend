import { Response } from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployeesByBar,
  updateEmployee,
} from "../services/employeeService";
import { mapErrorMsg } from "../utils/mapErrorMsg";
import { EmployeeRequest } from "../types/employee.types";
import { RequestWithBarID } from "../types/request.types";

export const createEmployeeController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { barID } = req.params;
    const businessID = req.user.businessID;
    const data: EmployeeRequest = req.body;
    const employee = await createEmployee(data, barID, businessID);
    res.status(201).json(employee);
  } catch (error) {
    const mappedError = mapErrorMsg((msg) => `Error creating employee: ${msg}`, error);
    console.error(mappedError);
    res.status(500).json({
      message: mappedError instanceof Error ? mappedError.message : "Internal Server Error",
    });
  }
};

export const getEmployeesByBarController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { barID } = req.params;
    const employees = await getEmployeesByBar(barID);
    res.status(200).json(employees);
  } catch (error) {
    const mappedError = mapErrorMsg((msg) => `Error fetching employees: ${msg}`, error);
    console.error(mappedError);
    res.status(500).json({
      message: mappedError instanceof Error ? mappedError.message : "Internal Server Error",
    });
  }
};

export const getEmployeeByIdController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { id, barID } = req.params;

    if (!id) {
      res.status(400).json({ message: "Not ID provided" });
      return;
    }

    const employee = await getEmployeeById(id, barID);
    res.status(200).json(employee);
  } catch (error) {
    const mappedError = mapErrorMsg((msg) => `Error fetching employee: ${msg}`, error);
    console.error(mappedError);
    res.status(500).json({
      message: mappedError instanceof Error ? mappedError.message : "Internal Server Error",
    });
  }
};

export const updateEmployeeController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { id, barID } = req.params;
    const data: EmployeeRequest = req.body;

    if (!id) {
      res.status(400).json({ message: "Not ID provided" });
      return;
    }

    const updatedEmployee = await updateEmployee(id, data, barID);
    res.status(200).json(updatedEmployee);
  } catch (error) {
    const mappedError = mapErrorMsg((msg) => `Error updating employee: ${msg}`, error);
    console.error(mappedError);
    res.status(500).json({
      message: mappedError instanceof Error ? mappedError.message : "Internal Server Error",
    });
  }
};

export const deleteEmployeeController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { id, barID } = req.params;

    if (!id) {
      res.status(400).json({ message: "Not ID provided" });
      return;
    }

    await deleteEmployee(id, barID);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    const mappedError = mapErrorMsg((msg) => `Error deleting employee: ${msg}`, error);
    console.error(mappedError);
    res.status(500).json({
      message: mappedError instanceof Error ? mappedError.message : "Internal Server Error",
    });
  }
};
