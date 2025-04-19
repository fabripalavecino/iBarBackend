import { Response } from "express";
import { validationResult } from "express-validator";
import { mapErrorMsg } from "../utils/mapErrorMsg";
import { RequestWithBarID } from "../types/request.types";
import {
  createFile,
  deleteFile,
  getFileById,
  getFiles,
  updateFile,
} from "../services/fileService";
import { FileRequest } from "../types/file.types";

export const createFileController = async (req: RequestWithBarID, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const businessID = req.user.businessID;
    const barID = req.params.barID;

    const data: FileRequest = {
      ...req.body,
      barID,
      businessID,
    };

    const file = await createFile(data);
    res.status(201).json(file);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error creating file: ${msg}`, error);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const getFilesController = async (req: RequestWithBarID, res: Response) => {
  try {
    const barID = req.params.barID;
    const files = await getFiles(barID);
    res.status(200).json(files);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error fetching files: ${msg}`, error);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const getFileByIdController = async (req: RequestWithBarID, res: Response) => {
  try {
    const { id, barID } = req.params;
    if (!id) {
      res.status(400).json({ message: "Missing file ID" });
      return;
    }

    const file = await getFileById(id);
    if (!file || file.isDeleted) { 
      res.status(404).json({ message: "File not found" });
      return;
    }

    res.status(200).json(file);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error fetching file: ${msg}`, error);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const updateFileController = async (req: RequestWithBarID, res: Response) => {
  try {
    const { id, barID } = req.params;
    if (!id) {
      res.status(400).json({ message: "File ID not provided" });
      return;
    }

    const updated = await updateFile(id, req.body);

    if (!updated) {
      res.status(404).json({ message: "File not found" });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error updating file: ${msg}`, error);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const deleteFileController = async (req: RequestWithBarID, res: Response) => {
  try {
    const { id, barID } = req.params;
    if (!id) {
      res.status(400).json({ message: "File ID not provided" });
      return;
    }

    const deleted = await deleteFile(id);

    if (!deleted) {
      res.status(404).json({ message: "File not found" });
      return;
    }

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error deleting file: ${msg}`, error);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};
