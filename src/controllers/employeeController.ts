import { Response } from "express";
import { validationResult } from "express-validator";
import { mapErrorMsg } from "../utils/mapErrorMsg";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";
import { RequestWithBarID } from "../types/request.types";
import { EmployeeRequest } from "../types/employee.types";

export const createEmployeeController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { barID } = req.params;
    const businessID = req.user.businessID;
    const data: EmployeeRequest = { ...req.body, barID, businessID };

    const newEmployee = await createEmployee(data);
    res.status(201).json(newEmployee);
  } catch (error) {
    const mappedError = mapErrorMsg((msg) => `Error creating employee: ${msg}`, error);
    console.error(mappedError);
    res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
  }
};

export const getEmployeesController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { barID } = req.params;
    const employees = await getEmployees(barID);
    res.status(200).json(employees);
  } catch (error) {
    const mappedError = mapErrorMsg((msg) => `Error fetching employees: ${msg}`, error);
    console.error(mappedError);
    res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
  }
};

export const getEmployeeByIdController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Missing employee ID" });
      return;
    }

    const employee = await getEmployeeById(id);
    if (!employee || employee.isDeleted) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    res.status(200).json(employee);
  } catch (error) {
    const mappedError = mapErrorMsg((msg) => `Error fetching employee: ${msg}`, error);
    console.error(mappedError);
    res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
  }
};

export const updateEmployeeController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data: Partial<EmployeeRequest> = req.body;

    if (!id) {
      res.status(400).json({ message: "Missing employee ID" });
      return;
    }

    const updated = await updateEmployee(id, data);
    if (!updated || updated.isDeleted) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    const mappedError = mapErrorMsg((msg) => `Error updating employee: ${msg}`, error);
    console.error(mappedError);
    res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
  }
};

export const deleteEmployeeController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Missing employee ID" });
      return;
    }

    const deleted = await deleteEmployee(id);
    if (!deleted) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    const mappedError = mapErrorMsg((msg) => `Error deleting employee: ${msg}`, error);
    console.error(mappedError);
    res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
  }
};
