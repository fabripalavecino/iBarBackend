import InventoryReport from "../models/InventoryReport";
import { InventoryReportRequest } from "../types/inventoryReport.types";

export const createInventoryReport = async (data: InventoryReportRequest) => {
  return await InventoryReport.create(data);
};

export const getInventoryReports = async (barID: string) => {
  return await InventoryReport.find({ barID, isDeleted: false });
};

export const getInventoryReportById = async (id: string) => {
  return await InventoryReport.findOne({ _id: id, isDeleted: false });
};

export const updateInventoryReport = async (id: string, data: Partial<InventoryReportRequest>) => {
  return await InventoryReport.findOneAndUpdate(
    { _id: id, isDeleted: false },
    data,
    { new: true }
  );
};

export const deleteInventoryReport = async (id: string) => {
  return await InventoryReport.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );
};
