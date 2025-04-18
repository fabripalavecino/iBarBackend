import File from "../models/File";
import { FileRequest } from "../types/file.types";

export const createFile = async (data: FileRequest) => {
  return await File.create(data);
};

export const getFiles = async (barID: string) => {
  return await File.find({ barID });
};

export const getFileById = async (id: string, barID: string) => {
  return await File.findOne({ _id: id, barID });
};

export const updateFile = async (
  id: string,
  barID: string,
  data: Partial<FileRequest>
) => {
  return await File.findOneAndUpdate({ _id: id, barID }, data, { new: true });
};

export const deleteFile = async (id: string, barID: string) => {
  return await File.findOneAndDelete({ _id: id, barID });
};
