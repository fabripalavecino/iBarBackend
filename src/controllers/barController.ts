import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { mapErrorMsg } from "../utils/mapErrorMsg";
import { createBar, getBars, getBarById, updateBar, deleteBar, createBarManager } from "../services/barService";
import { BarRequest } from "../types/bar.types";
import { RequestWithBarID } from "../types/request.types";

export const createBarController = async (req: Request, res: Response): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const userId = req.user.id;
        if(!userId) throw new Error('UserId not found');

        const data: BarRequest = {
            ...req.body,
            businessID: req.user.businessID
        };

        if (!data.barLogo) {
            res.status(400).json({ message: "barLogo is required." });
            return;
        }

        const response = await createBar(data, userId);
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

export const getBarByIdController = async (req: RequestWithBarID, res: Response): Promise<void> => {
    try {
        const { barID } = req.params;

        const response = await getBarById(barID);
        res.status(200).json(response);
    } catch (error) {
        const mappedError = mapErrorMsg((msg) => `Error fetching bar: ${msg}`, error);
        console.error(mappedError);
        res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
    }
};

export const updateBarController = async (req: RequestWithBarID, res: Response): Promise<void> => {
    try {
        const { barID } = req.params;
        const data: BarRequest = req.body;

        const response = await updateBar(barID, data);
        res.status(200).json(response);
    } catch (error) {
        const mappedError = mapErrorMsg((msg) => `Error updating bar: ${msg}`, error);
        console.error(mappedError);
        res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
    }
};

export const deleteBarController = async (req: RequestWithBarID, res: Response): Promise<void> => {
    try {
        const { barID } = req.params;

        await deleteBar(barID);
        res.status(200).json({ message: "Bar deleted successfully." });
    } catch (error) {
        const mappedError = mapErrorMsg((msg) => `Error deleting bar: ${msg}`, error);
        console.error(mappedError);
        res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
    }
};

export const createBarManagerController = async (req: RequestWithBarID, res: Response): Promise<void> => {
    try {
        const { barID } = req.params;

        const { first, last, email, phoneNumber, password } = req.body;

        const newUser = await createBarManager({
            first,
            last,
            email,
            phoneNumber,
            password,
            barID
        });

        res.status(201).json({ message: "Bar Manager created", user: newUser });
    } catch (err: unknown) {
        const mappedError = mapErrorMsg((msg) => `Error creating a Bar Manager ${msg}`, err);
        console.error(mappedError);
        res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
    }
};

