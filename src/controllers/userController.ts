import { Request, Response } from "express";
import { mapErrorMsg } from "../utils/mapErrorMsg";
import { getUsers, getUserById, updateUser, deleteUser } from "../services/userService";
import { UserUpdateRequest } from "../types/user.types";


export const getUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search?.toString() || "";

    const users = await getUsers({ page, limit, search });
    res.status(200).json(users);
  } catch (error) {
    const mappedError = mapErrorMsg((msg) => `Error fetching users: ${msg}`, error);
    console.error(mappedError);
    res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
  }
};


export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "Not ID provided" });
        return;
      }
    const user = await getUserById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    const mappedError = mapErrorMsg((msg) => `Error fetching user: ${msg}`, error);
    console.error(mappedError);
    res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
  }
};

export const updateUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data: UserUpdateRequest = req.body;

    if (!id) {
        res.status(400).json({ message: "Not ID provided" });
        return;
      }

    const updated = await updateUser(id, data);
    if (!updated) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    const mappedError = mapErrorMsg((msg) => `Error updating user: ${msg}`, error);
    console.error(mappedError);
    res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
  }
};

export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ message: "Not ID provided" });
        return;
      }

    const deleted = await deleteUser(id);
    if (!deleted) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    const mappedError = mapErrorMsg((msg) => `Error deleting user: ${msg}`, error);
    console.error(mappedError);
    res.status(500).json({ message: mappedError instanceof Error ? mappedError.message : "Internal Server Error" });
  }
};
