import Task from "../models/Task";
import { TaskRequest } from "../types/task.types";

export const createTask = async (data: TaskRequest) => {
  return await Task.create(data);
};

export const getTasks = async (businessID: string) => {
  return await Task.find({ businessID, isDeleted: false });
};

export const getTaskById = async (id: string) => {
  return await Task.findOne({ _id: id, isDeleted: false });
};

export const updateTask = async (id: string, data: Partial<TaskRequest>) => {
  return await Task.findOneAndUpdate(
    { _id: id, isDeleted: false },
    data,
    { new: true }
  );
};

export const deleteTask = async (id: string) => {
  return await Task.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );
};
