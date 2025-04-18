import InventoryReport from "../models/InventoryReport";
import { InventoryReportRequest } from "../types/inventoryReport.types";

export const createInventoryReport = async (data: InventoryReportRequest) => {
  return await InventoryReport.create(data);
};

export const getInventoryReports = async (barID: string) => {
  return await InventoryReport.find({ barID });
};

export const getInventoryReportById = async (id: string, barID: string) => {
  return await InventoryReport.findOne({ _id: id, barID });
};

export const updateInventoryReport = async (
  id: string,
  barID: string,
  data: Partial<InventoryReportRequest>
) => {
  return await InventoryReport.findOneAndUpdate({ _id: id, barID }, data, { new: true });
};

export const deleteInventoryReport = async (id: string, barID: string) => {
  return await InventoryReport.findOneAndDelete({ _id: id, barID });
};
