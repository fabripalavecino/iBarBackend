// src/services/taskService.ts
import Task from "../models/Task";
import { TaskRequest } from "../types/task.types";

export const createTask = async (data: TaskRequest) => {
  return await Task.create(data);
};

export const getTasks = async (businessID: string) => {
  return await Task.find({ businessID });
};

export const getTaskById = async (id: string) => {
  return await Task.findById(id);
};

export const updateTask = async (id: string, data: Partial<TaskRequest>) => {
  return await Task.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTask = async (id: string) => {
  return await Task.findByIdAndDelete(id);
};
