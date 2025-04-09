import Menu from "../models/Menu";
import { MenuRequest } from "../types/menu.types";

export const createMenu = async (data: MenuRequest) => {
    return await Menu.create(data);
};

export const getMenus = async (barID: string) => {
    return await Menu.find({ barID });
};

export const getMenuById = async (id: string, barID: string) => {
    return await Menu.findOne({ _id: id, barID });
};

export const updateMenu = async (id: string, barID: string, data: Partial<MenuRequest>) => {
    return await Menu.findOneAndUpdate({ _id: id, barID }, data, { new: true });
};

export const deleteMenu = async (id: string, barID: string) => {
    return await Menu.findOneAndDelete({ _id: id, barID });
};
