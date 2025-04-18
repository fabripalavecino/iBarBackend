import { Response } from "express";
import { validationResult } from "express-validator";
import { mapErrorMsg } from "../utils/mapErrorMsg";
import { RequestWithBarID } from "../types/request.types";
import { ClientRequest } from "../types/client.types";
import { createClient, getClients, getClientById, updateClient, deleteClient } from "../services/clientService";

export const createClientController = async (req: RequestWithBarID, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const barID = req.params.barID;
    const businessID = req.user.businessID;

    const data: ClientRequest = {
      ...req.body,
      barID,
      businessID,
    };

    const newClient = await createClient(data);
    res.status(201).json(newClient);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error creating client: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const getClientsController = async (req: RequestWithBarID, res: Response) => {
  try {
    const barID = req.params.barID;
    const clients = await getClients(barID);
    res.status(200).json(clients);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error fetching clients: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const getClientByIdController = async (req: RequestWithBarID, res: Response) => {
  try {
    const { id, barID } = req.params;
    if (!id) {
      res.status(400).json({ message: "Missing client ID" });
      return;
    }

    const client = await getClientById(id, barID);
    if (!client) {
      res.status(404).json({ message: "Client not found" });
      return;
    }

    res.status(200).json(client);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error fetching client: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const updateClientController = async (req: RequestWithBarID, res: Response) => {
  try {
    const { id, barID } = req.params;
    if (!id) {
      res.status(400).json({ message: "Missing client ID" });
      return;
    }

    const updated = await updateClient(id, barID, req.body);
    if (!updated) {
      res.status(404).json({ message: "Client not found" });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error updating client: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};

export const deleteClientController = async (req: RequestWithBarID, res: Response) => {
  try {
    const { id, barID } = req.params;
    if (!id) {
      res.status(400).json({ message: "Missing client ID" });
      return;
    }

    const deleted = await deleteClient(id, barID);
    if (!deleted) {
      res.status(404).json({ message: "Client not found" });
      return;
    }

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    const mapped = mapErrorMsg((msg) => `Error deleting client: ${msg}`, error);
    console.error(mapped);
    res.status(500).json({ message: mapped instanceof Error ? mapped.message : "Internal Server Error" });
  }
};
