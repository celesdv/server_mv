import { Request, Response } from "express";
import { Budget } from "../models/budget";
import { Hotel } from "../models/hotel";

export const getBudgets = async (req: Request, res: Response) => {
  const listBudgets = await Budget.findAll({
    where: { soft_delete: false },
    include: { all: true },
  });
  res.json(listBudgets);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const budget = await Budget.findOne({
    where: { id: id, soft_delete: false },
    include: { all: true },
  });

  if (budget) {
    res.json(budget);
  } else {
    res.status(404).json({
      msg: `No existe un presupuesto con el id ${id}`,
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const budget = await Budget.create(body);

    res.json(budget);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Upps ocurrio un error, comuniquese con soporte`,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  try {

    const budget = await Budget.findOne({
      where: { id: id, soft_delete: false },
    });

    if (budget) {
      await budget.update(body);
      res.json({
        msg: "El presupuesto fue actualizado con exito",
      });
    } else {
      res.status(404).json({
        msg: `No existe un presupuesto con el id ${id}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Upps ocurrio un error, comuniquese con soporte`,
    });
  }
};

export const softDelete = async (req: Request, res: Response) => {
  const { id } = req.params;
  const budget = await Budget.findOne({
    where: { id: id, soft_delete: false },
  });

  if (!budget) {
    res.status(404).json({
      msg: `No existe un presupuesto con el id ${id}`,
    });
  } else {
    await budget.update({ soft_delete: true });
    res.json({
      msg: "El presupuesto fue eliminado con exito!",
    });
  }
};
