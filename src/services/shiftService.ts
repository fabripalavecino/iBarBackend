import Shift from "../models/Shift";
import { ShiftRequest } from "../types/shift.types";

export const createShift = async (data: ShiftRequest) => {
  return await Shift.create(data);
};

export const getShifts = async (barID: string) => {
  return await Shift.find({ barID, isDeleted: false });
};

export const getShiftById = async (id: string) => {
  return await Shift.findOne({ _id: id, isDeleted: false });
};

export const updateShift = async (id: string, data: Partial<ShiftRequest>) => {
  return await Shift.findOneAndUpdate({ _id: id, isDeleted: false }, data, { new: true });
};

export const deleteShift = async (id: string) => {
  return await Shift.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
};
