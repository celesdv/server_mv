import { Request, Response } from "express";
import { Client } from "../models/client";

export const getClients = async (req: Request, res: Response) => {
  const listClients = await Client.findAll({ where: { soft_delete: false } })
  res.json(listClients);
};
