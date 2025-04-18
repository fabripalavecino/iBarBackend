import Shift from "../models/Shift";
import { ShiftRequest } from "../types/shift.types";


export const createShift = async (
  data: ShiftRequest
) => {
  const newShift = new Shift({
    ...data,
  });
  return await newShift.save();
};

export const getShifts = async (barID: string) => {
  return await Shift.find({ barID });
};

export const getShiftById = async (id: string, barID: string) => {
  return await Shift.findOne({ _id: id, barID });
};

export const updateShift = async (
  id: string,
  barID: string,
  data: Partial<ShiftRequest>
) => {
  return await Shift.findOneAndUpdate({ _id: id, barID }, data, { new: true });
};

export const deleteShift = async (id: string, barID: string) => {
  return await Shift.findOneAndDelete({ _id: id, barID });
};
