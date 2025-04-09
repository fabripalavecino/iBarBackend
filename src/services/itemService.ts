import Item from "../models/Item";
import { ItemRequest } from "../types/item.types";

export const createItem = async (data: ItemRequest) => {
    return await Item.create(data);
};

export const getItems = async (barID: string) => {
    return await Item.find({ barID });
};

export const getItemById = async (id: string) => {
    return await Item.findById(id);
};

export const updateItem = async (id: string, data: Partial<ItemRequest>) => {
    return await Item.findByIdAndUpdate(id, data, { new: true });
};

export const deleteItem = async (id: string) => {
    return await Item.findByIdAndDelete(id);
};
