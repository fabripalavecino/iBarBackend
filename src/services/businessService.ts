import Business from "../models/Business";
import { BusinessRequest } from "../types/business.types";


export const createBusiness = async (data: BusinessRequest) => {
  return await Business.create(data);
};

export const getBusinesses = async () => {
  return await Business.find({ isDeleted: false });
};

export const getBusinessById = async (id: string) => {
  return await Business.findOne({ _id: id, isDeleted: false });
};

export const updateBusiness = async (id: string, data: Partial<BusinessRequest>) => {
  return await Business.findOneAndUpdate(
    { _id: id, isDeleted: false },
    data,
    { new: true }
  );
};

export const deleteBusiness = async (id: string) => {
  return await Business.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );
};