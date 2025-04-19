import Item from "../models/Item";
import { ItemRequest } from "../types/item.types";


export const createItem = async (data: ItemRequest) => {
  return await Item.create(data);
};

export const getItems = async (barID: string) => {
  return await Item.find({ barID, isDeleted: false });
};


export const getItemById = async (id: string) => {
  return await Item.findOne({ _id: id, isDeleted: false });
};


export const updateItem = async (id: string, data: Partial<ItemRequest>) => {
  return await Item.findOneAndUpdate(
    { _id: id, isDeleted: false },
    data,
    { new: true }
  );
};

export const deleteItem = async (id: string) => {
  return await Item.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );
};
