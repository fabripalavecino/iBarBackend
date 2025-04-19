import File from "../models/File";
import { FileRequest } from "../types/file.types";

export const createFile = async (data: FileRequest) => {
  return await File.create(data);
};

export const getFiles = async (barID: string) => {
  return await File.find({ barID, isDeleted: false });
};

export const getFileById = async (id: string) => {
  return await File.findOne({ _id: id, isDeleted: false }); 
};

export const updateFile = async (id: string, data: Partial<FileRequest>) => {
  return await File.findOneAndUpdate(
    { _id: id, isDeleted: false },
    data,
    { new: true }
  );
};

export const deleteFile = async (id: string) => {
  return await File.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );
};
