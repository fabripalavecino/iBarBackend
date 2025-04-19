import { Response } from "express";
import { validationResult } from "express-validator";
import { mapErrorMsg } from "../utils/mapErrorMsg";
import { RequestWithBarID } from "../types/request.types";
import { WorkReportRequest } from "../types/workReport.types";
import {
  createWorkReport,
  getWorkReports,
  getWorkReportById,
  updateWorkReport,
  deleteWorkReport,
} from "../services/workReportService";

export const createWorkReportController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const barID = req.params.barID;
    const businessID = req.user.businessID;

    const data: WorkReportRequest = { ...req.body, barID, businessID };
    const report = await createWorkReport(data);
    res.status(201).json(report);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error creating work report: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const getWorkReportsController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { barID } = req.params;
    const reports = await getWorkReports(barID);
    res.status(200).json(reports);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error fetching work reports: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const getWorkReportByIdController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Missing report ID" });
      return;
    }

    const report = await getWorkReportById(id);
    if (!report) {
      res.status(404).json({ message: "Work report not found" });
      return;
    }

    res.status(200).json(report);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error fetching work report: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const updateWorkReportController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Missing report ID" });
      return;
    }
    const updated = await updateWorkReport(id, req.body);

    if (!updated) {
      res.status(404).json({ message: "Work report not found" });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error updating work report: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const deleteWorkReportController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Missing report ID" });
      return;
    }
    const deleted = await deleteWorkReport(id);


    if (!deleted) {
      res.status(404).json({ message: "Work report not found" });
      return;
    }

    res.status(200).json({ message: "Work report deleted successfully." });
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error deleting work report: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};