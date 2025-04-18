import { Response } from "express";
import { validationResult } from "express-validator";
import { mapErrorMsg } from "../utils/mapErrorMsg";
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} from "../services/itemService";
import { ItemRequest } from "../types/item.types";
import { RequestWithBarID } from "../types/request.types";

export const createItemController = async (req: RequestWithBarID, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const barID = req.params.barID;
    const businessID = req.user.businessID;

    const data: ItemRequest = {
      ...req.body,
      barID,
      businessID,
    };

    const newItem = await createItem(data);
    res.status(201).json(newItem);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error creating item: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const getItemsController = async (req: RequestWithBarID, res: Response) => {
  try {
    const barID = req.params.barID;
    if (!barID) {
      res.status(400).json({ message: "Missing barID in URL params" });
      return;
    }
    const items = await getItems(barID);
    res.status(200).json(items);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error fetching items: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const getItemByIdController = async (req: RequestWithBarID, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Missing item ID in URL params" });
      return;
    }
    const item = await getItemById(id);
    if (!item) {
      res.status(404).json({ message: "Item not found" });
      return;
    }
    res.status(200).json(item);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error fetching item: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const updateItemController = async (req: RequestWithBarID, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({ message: "Item ID not provided" });
      return;
    }

    const barID = req.params.barID;
    const businessID = req.user.businessID;

    const updated = await updateItem(id, { ...req.body, barID, businessID });
    if (!updated) {
      res.status(404).json({ message: "Item not found" });
      return;
    }
    res.status(200).json(updated);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error updating item: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const deleteItemController = async (req: RequestWithBarID, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Item ID not provided" });
      return;
    }
    const deleted = await deleteItem(id);
    if (!deleted) {
      res.status(404).json({ message: "Item not found" });
      return;
    }
    res.status(200).json({ message: "Item deleted successfully." });
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error deleting item: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};
