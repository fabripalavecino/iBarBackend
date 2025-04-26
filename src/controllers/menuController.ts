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

export const createMenuController = async (req: RequestWithBarID, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const barID = req.params.barID;
    const businessID = req.user.businessID;
    const { name, price, drinksList } = req.body;

    const data = {
      name,
      price,
      drinksList,
      barID,
      businessID,
    };

    const newMenu = await createMenu(data);
    res.status(201).json(newMenu);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error creating menu: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const getMenusController = async (req: RequestWithBarID, res: Response) => {
  try {
    const barID = req.params.barID;
    if (!barID) {
      res.status(400).json({ message: "Missing barID in URL params" });
      return;
    }

    const menus = await getMenus(barID);
    res.status(200).json(menus);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error fetching menus: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const getMenuByIdController = async (req: RequestWithBarID, res: Response) => {
  try {
    const { menuID } = req.params;

    if (!menuID) {
      res.status(400).json({ message: "Missing menuID in URL params" });
      return;
    }

    const menu = await getMenuById(menuID);
    if (!menu) {
      res.status(404).json({ message: "Menu not found" });
      return;
    }
    res.status(200).json(menu);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error fetching menu: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const updateMenuController = async (req: RequestWithBarID, res: Response) => {
  try {
    const { menuID } = req.params;

    if (!menuID) {
      res.status(400).json({ message: "Missing menuID in URL params" });
      return;
    }

    const updated = await updateMenu(menuID, req.body);
    if (!updated) {
      res.status(404).json({ message: "Menu not found" });
      return;
    }
    res.status(200).json(updated);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error updating menu: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const deleteMenuController = async (req: RequestWithBarID, res: Response) => {
  try {
    const { menuID } = req.params;

    if (!menuID) {
      res.status(400).json({ message: "Missing menuID in URL params" });
      return;
    }

    const deleted = await deleteMenu(menuID);
    if (!deleted) {
      res.status(404).json({ message: "Menu not found" });
      return;
    }
    res.status(200).json({ message: "Menu deleted successfully." });
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error deleting menu: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};
