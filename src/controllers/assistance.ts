import { Request, Response } from "express";
import { Assistance } from "../models/assistance";

export const getAssistances = async (req: Request, res: Response) => {
  const listAssistances = await Assistance.findAll({
    where: { soft_delete: false },
  });
  res.json(listAssistances);
};

export const getById = (req: Request, res: Response) => {};

export const getByBudget = (req: Request, res: Response) => {};

export const create = (req: Request, res: Response) => {};

export const update = (req: Request, res: Response) => {};

export const softDelete = (req: Request, res: Response) => {};