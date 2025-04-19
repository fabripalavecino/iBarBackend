import { Response } from "express";
import { validationResult } from "express-validator";
import { mapErrorMsg } from "../utils/mapErrorMsg";
import {
  createInventoryReport,
  getInventoryReports,
  getInventoryReportById,
  updateInventoryReport,
  deleteInventoryReport,
} from "../services/inventoryReportService";
import { InventoryReportRequest } from "../types/inventoryReport.types";
import { RequestWithBarID } from "../types/request.types";

export const createInventoryReportController = async (req: RequestWithBarID, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const barID = req.params.barID;
    const businessID = req.user.businessID;

    const data: InventoryReportRequest = {
      ...req.body,
      barID,
      businessID,
    };

    const newReport = await createInventoryReport(data);
    res.status(201).json(newReport);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error creating inventory report: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const getInventoryReportsController = async (req: RequestWithBarID, res: Response) => {
  try {
    const barID = req.params.barID;
    if (!barID) {
      res.status(400).json({ message: "Missing barID in URL params" });
      return;
    }

    const reports = await getInventoryReports(barID);
    res.status(200).json(reports);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error fetching inventory reports: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const getInventoryReportByIdController = async (req: RequestWithBarID, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Missing inventory report ID in URL params" });
      return;
    }

    const report = await getInventoryReportById(id);
    if (!report) {
      res.status(404).json({ message: "Inventory report not found" });
      return;
    }

    res.status(200).json(report);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error fetching inventory report: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const updateInventoryReportController = async (req: RequestWithBarID, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Inventory report ID not provided" });
      return;
    }

    const barID = req.params.barID;
    const businessID = req.user.businessID;

    const updated = await updateInventoryReport(id, {
      ...req.body,
      barID,
      businessID,
    });

    if (!updated) {
      res.status(404).json({ message: "Inventory report not found" });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error updating inventory report: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const deleteInventoryReportController = async (req: RequestWithBarID, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Inventory report ID not provided" });
      return;
    }

    const deleted = await deleteInventoryReport(id);
    if (!deleted) {
      res.status(404).json({ message: "Inventory report not found" });
      return;
    }

    res.status(200).json({ message: "Inventory report deleted successfully." });
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error deleting inventory report: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};
