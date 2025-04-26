import { Response } from "express";
import { validationResult } from "express-validator";
import { RequestWithBarID } from "../types/request.types";
import { mapErrorMsg } from "../utils/mapErrorMsg";
import {
  createShift,
  getShifts,
  getShiftById,
  updateShift,
  deleteShift,
} from "../services/shiftService";
import { ShiftRequest } from "../types/shift.types";

export const createShiftController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { barID } = req.params;
    const businessID = req.user.businessID;

    const data: ShiftRequest = { ...req.body, barID, businessID };
    const created = await createShift(data);
    res.status(201).json(created);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error creating shift: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const getShiftsController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { barID } = req.params;
    const shifts = await getShifts(barID);
    res.status(200).json(shifts);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error fetching shifts: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const getShiftByIdController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Missing shift ID" });
      return;
    }

    const shift = await getShiftById(id);
    if (!shift) {
      res.status(404).json({ message: "Shift not found" });
      return;
    }

    res.status(200).json(shift);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error fetching shift: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const updateShiftController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const barID = req.params.barID;
    const businessID = req.user.businessID;

    if (!id) {
      res.status(400).json({ message: "Missing shift ID" });
      return;
    }

    const updated = await updateShift(id, { ...req.body, barID, businessID });
    if (!updated) {
      res.status(404).json({ message: "Shift not found" });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error updating shift: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const deleteShiftController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Missing shift ID" });
      return;
    }

    const deleted = await deleteShift(id);
    if (!deleted) {
      res.status(404).json({ message: "Shift not found" });
      return;
    }

    res.status(200).json({ message: "Shift deleted successfully." });
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error deleting shift: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};
