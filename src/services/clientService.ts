import Client, { IClient } from "../models/Client";
import { ClientRequest } from "../types/client.types";

export const createClient = async (data: ClientRequest) => {
  return await Client.create(data);
};

export const getClients = async (barID: string): Promise<IClient[]> => {
  return await Client.find({ barID, isDeleted: false });
};

export const getClientById = async (id: string): Promise<IClient | null> => {
  return await Client.findOne({ _id: id, isDeleted: false });
};


export const updateClient = async (id: string, data: Partial<ClientRequest>) => {
  return await Client.findByIdAndUpdate(
    { _id: id, isDeleted: false },
    data,
    { new: true }
  );
};

export const deleteClient = async (id: string): Promise<IClient | null> => {
  return await Client.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

