import WorkReport from "../models/WorkReport";
import { WorkReportRequest } from "../types/workReport.types";

export const createWorkReport = async (data: WorkReportRequest) => {
  return await WorkReport.create(data);
};

export const getWorkReports = async (barID: string) => {
  return await WorkReport.find({ barID, isDeleted: false });
};

export const getWorkReportById = async (id: string) => {
  return await WorkReport.findOne({ _id: id, isDeleted: false });
};

export const updateWorkReport = async (id: string, data: Partial<WorkReportRequest>) => {
  return await WorkReport.findOneAndUpdate({ _id: id, isDeleted: false }, data, { new: true });
};

export const deleteWorkReport = async (id: string) => {
  return await WorkReport.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
};
