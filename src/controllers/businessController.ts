import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { mapErrorMsg } from "../utils/mapErrorMsg";
import { createBusiness, getBusinesses, getBusinessById, updateBusiness, deleteBusiness } from "../services/businessService";
import { BusinessRequest } from "../types/business.types";


export const createBusinessController = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const owner_id = req.user.id;
    const data: BusinessRequest = {
      ...req.body,
      owner_id,
    };

    const business = await createBusiness(data);
    res.status(201).json(business);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error creating business: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const getBusinessesController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const businesses = await getBusinesses();
    res.status(200).json(businesses);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error fetching businesses: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const getBusinessByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "Missing Business ID" });
        return;
    }
    const business = await getBusinessById(id);
    if (!business) {
      res.status(404).json({ message: "Business not found" });
      return;
    }
    res.status(200).json(business);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error fetching business: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const updateBusinessController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "Missing Business ID" });
        return;
    }
    const updated = await updateBusiness(id, req.body);
    if (!updated) {
      res.status(404).json({ message: "Business not found" });
      return;
    }
    res.status(200).json(updated);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error updating business: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const deleteBusinessController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "Missing Business ID" });
        return;
    }
    const deleted = await deleteBusiness(id);
    if (!deleted) {
      res.status(404).json({ message: "Business not found" });
      return;
    }
    res.status(200).json({ message: "Business deleted successfully" });
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error deleting business: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};