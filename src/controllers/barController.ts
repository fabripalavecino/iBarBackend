import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { mapErrorMsg } from "../utils/mapErrorMsg";
import { createBar, getBars, getBarById, updateBar, deleteBar } from "../services/barService";
import { BarRequest } from "../types/bar.types";

export const createBarController = async (req: Request, res: Response): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const data: BarRequest = req.body;

        if (!data.barLogo) {
            res.status(400).json({ message: "barLogo is required." });
            return;
        }

        const response = await createBar(data);
        res.status(201).json(response);
    } catch (error) {
        const mappedError = mapErrorMsg((msg) => `Error creating bar: ${msg}`, error);
        console.error(mappedError);
        res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
    }
};

export const getBarsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search?.toString() || "";

        const response = await getBars({ page, limit, search });
        res.status(200).json(response);
    } catch (error) {
        const mappedError = mapErrorMsg((msg) => `Error fetching bars: ${msg}`, error);
        console.error(mappedError);
        res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
    }
};

export const getBarByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Invalid ID" });
            return;
        }

        const response = await getBarById(id);
        res.status(200).json(response);
    } catch (error) {
        const mappedError = mapErrorMsg((msg) => `Error fetching bar: ${msg}`, error);
        console.error(mappedError);
        res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
    }
};

export const updateBarController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const data: BarRequest = req.body;

        if (!id) {
            res.status(400).json({ message: "Invalid ID" });
            return;
        }

        const response = await updateBar(id, data);
        res.status(200).json(response);
    } catch (error) {
        const mappedError = mapErrorMsg((msg) => `Error updating bar: ${msg}`, error);
        console.error(mappedError);
        res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
    }
};

export const deleteBarController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Invalid ID" });
            return;
        }

        await deleteBar(id);
        res.status(200).json({ message: "Bar deleted successfully." });
    } catch (error) {
        const mappedError = mapErrorMsg((msg) => `Error deleting bar: ${msg}`, error);
        console.error(mappedError);
        res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
    }
};
