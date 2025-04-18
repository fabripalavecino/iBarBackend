import Client from "../models/Client";
import { ClientRequest } from "../types/client.types";

export const createClient = async (data: ClientRequest) => {
  return await Client.create(data);
};

export const getClients = async (barID: string) => {
  return await Client.find({ barID });
};

export const getClientById = async (id: string, barID: string) => {
  return await Client.findOne({ _id: id, barID });
};

export const updateClient = async (
  id: string,
  barID: string,
  data: Partial<ClientRequest>
) => {
  return await Client.findOneAndUpdate({ _id: id, barID }, data, { new: true });
};

export const deleteClient = async (id: string, barID: string) => {
  return await Client.findOneAndDelete({ _id: id, barID });
};
