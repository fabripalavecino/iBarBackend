import { Response } from "express";
import { validationResult } from "express-validator";
import { RequestWithBarID } from "../types/request.types";
import { mapErrorMsg } from "../utils/mapErrorMsg";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../services/taskService";
import { TaskRequest } from "../types/task.types";

export const createTaskController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const businessID = req.user.businessID;
    const data: TaskRequest = { ...req.body, businessID };

    const task = await createTask(data);
    res.status(201).json(task);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error creating task: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({
      message: mapped instanceof Error ? mapped.message : "Internal Server Error",
    });
  }
};

export const getTasksController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const businessID = req.user.businessID;
    const tasks = await getTasks(businessID);
    res.status(200).json(tasks);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error fetching tasks: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({
      message: mapped instanceof Error ? mapped.message : "Internal Server Error",
    });
  }
};

export const getTaskByIdController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Missing task ID" });
      return;
    }

    const task = await getTaskById(id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error fetching task: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({
      message: mapped instanceof Error ? mapped.message : "Internal Server Error",
    });
  }
};

export const updateTaskController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Missing task ID" });
      return;
    }

    const updated = await updateTask(id, req.body);
    if (!updated) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error updating task: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({
      message: mapped instanceof Error ? mapped.message : "Internal Server Error",
    });
  }
};

export const deleteTaskController = async (req: RequestWithBarID, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Missing task ID" });
      return;
    }

    const deleted = await deleteTask(id);
    if (!deleted) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error deleting task: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({
      message: mapped instanceof Error ? mapped.message : "Internal Server Error",
    });
  }
};
