import User, { IUser } from "../models/User";
import { UserUpdateRequest } from "../types/user.types";
import { FilterQuery } from "mongoose";

export const getUsers = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const query: FilterQuery<IUser> = { isDeleted: false };

  if (search) {
    query.$or = [
      { email: { $regex: search, $options: "i" } },
      { phoneNumber: { $regex: search, $options: "i" } },
      { first: { $regex: search, $options: "i" } },
      { last: { $regex: search, $options: "i" } },
    ];
  }

  const users = await User.find(query)
    .select("-password")
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await User.countDocuments(query);
  return { users, total, page, limit };
};

export const getUserById = async (id: string) => {
  return await User.findOne({ _id: id, isDeleted: false }).select("-password");;
};

export const updateUser = async (id: string, data: Partial<UserUpdateRequest>) => {
  return await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    data,
    { new: true }
  );
};

export const deleteUser = async (id: string) => {
  return await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );
};
