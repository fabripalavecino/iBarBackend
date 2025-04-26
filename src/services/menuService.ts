import Menu from "../models/Menu";
import { MenuRequest } from "../types/menu.types";

export const createMenu = async (data: MenuRequest) => {
  return await Menu.create(data);
};

export const getMenus = async (barID: string) => {
  return await Menu.find({ barID, isDeleted: false });
};

export const getMenuById = async (id: string) => {
  return await Menu.findOne({ _id: id, isDeleted: false });
};

export const updateMenu = async (id: string, data: Partial<MenuRequest>) => {
  return await Menu.findOneAndUpdate({ _id: id, isDeleted: false }, data, { new: true });
};

export const deleteMenu = async (id: string) => {
  return await Menu.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
};
