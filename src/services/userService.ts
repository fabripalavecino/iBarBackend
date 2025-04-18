// src/services/userService.ts
import User from "../models/User";
import { UserUpdateRequest } from "../types/user.types";

export const getUsers = async ({
    page,
    limit,
    search,
  }: {
    page: number;
    limit: number;
    search: string;
  }) => {
    const query = search
      ? {
          $or: [
            { first: new RegExp(search, "i") },
            { last: new RegExp(search, "i") },
            { email: new RegExp(search, "i") },
          ],
        }
      : {};
  
    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-password"); // optional: exclude password
  
    const total = await User.countDocuments(query);
  
    return {
      users,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  };
  
export const getUserById = async (id: string) => {
  return await User.findById(id).select("-password");
};

export const updateUser = async (id: string, data: UserUpdateRequest) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};
