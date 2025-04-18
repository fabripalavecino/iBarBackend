import WorkReport from "../models/WorkReport";
import { WorkReportRequest } from "../types/workReport.types";


export const createWorkReport = async (data: WorkReportRequest) => {
  return await WorkReport.create(data);
};

export const getWorkReports = async (barID: string) => {
  return await WorkReport.find({ barID });
};

export const getWorkReportById = async (id: string, barID: string) => {
  return await WorkReport.findOne({ _id: id, barID });
};

export const updateWorkReport = async (
  id: string,
  barID: string,
  data: Partial<WorkReportRequest>
) => {
  return await WorkReport.findOneAndUpdate({ _id: id, barID }, data, { new: true });
};

export const deleteWorkReport = async (id: string, barID: string) => {
  return await WorkReport.findOneAndDelete({ _id: id, barID });
};
