import { Response } from "express";
import { validationResult } from "express-validator";
import { mapErrorMsg } from "../utils/mapErrorMsg";
import {
  createMenu,
  getMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
} from "../services/menuService";
import { RequestWithBarID } from "../types/request.types";

export const createMenuController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { barID } = req.params;
    const { name, items } = req.body;

    const newMenu = await createMenu({ barID, name, items });
    res.status(201).json(newMenu);
  } catch (error) {
    const mappedError = mapErrorMsg((msg) => `Error creating menu: ${msg}`, error);
    console.error(mappedError);
    res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
  }
};

export const getMenusController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { barID } = req.params;
    const menus = await getMenus(barID);
    res.status(200).json(menus);
  } catch (error) {
    const mappedError = mapErrorMsg((msg) => `Error fetching menus: ${msg}`, error);
    console.error(mappedError);
    res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
  }
};

export const getMenuByIdController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { barID, menuID } = req.params;

    if (!menuID) {
      res.status(400).json({ message: "Missing menuID in parameters" });
      return;
    }

    const menu = await getMenuById(menuID, barID);
    if (!menu) {
      res.status(404).json({ message: "Menu not found" });
      return;
    }

    res.status(200).json(menu);
  } catch (error) {
    const mappedError = mapErrorMsg((msg) => `Error fetching menu: ${msg}`, error);
    console.error(mappedError);
    res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
  }
};

export const updateMenuController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { barID, menuID } = req.params;

    if (!menuID) {
      res.status(400).json({ message: "Missing menuID in parameters" });
      return;
    }

    const updated = await updateMenu(menuID, barID, req.body);
    if (!updated) {
      res.status(404).json({ message: "Menu not found" });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    const mappedError = mapErrorMsg((msg) => `Error updating menu: ${msg}`, error);
    console.error(mappedError);
    res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
  }
};

export const deleteMenuController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { barID, menuID } = req.params;

    if (!menuID) {
      res.status(400).json({ message: "Missing menuID in parameters" });
      return;
    }

    const deleted = await deleteMenu(menuID, barID);
    if (!deleted) {
      res.status(404).json({ message: "Menu not found" });
      return;
    }

    res.status(200).json({ message: "Menu deleted successfully." });
  } catch (error) {
    const mappedError = mapErrorMsg((msg) => `Error deleting menu: ${msg}`, error);
    console.error(mappedError);
    res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
  }
};
