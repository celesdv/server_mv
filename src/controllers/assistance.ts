import { Request, Response } from "express";
import { Assistance } from "../models/assistance";

export const getAssistances = async (req: Request, res: Response) => {
  const listAssistances = await Assistance.findAll({
    where: { soft_delete: false },
    include: { all: true },
  });
  res.json(listAssistances);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const assistance = await Assistance.findOne({
    where: { id: id, soft_delete: false },
    include: { all: true },
  });

  if (assistance) {
    res.json(assistance);
  } else {
    res.status(404).json({
      msg: `No existe una asistencia con el id ${id}`,
    });
  }
};

export const getByBudget = async (req: Request, res: Response) => {
  const { id } = req.params;
  const listAssistances = await Assistance.findAll({
    where: { budgetId: id, soft_delete: false },
    include: { all: true },
  });

  if  (listAssistances) {
    res.json(listAssistances);
  } else {
    res.status(404).json({
      msg: `No existen asistencias en el presupuesto con el id ${id}`,
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await Assistance.create(body);

    res.json({
      msg: `La asistencia fue agregada con exito!`,
    });
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
    const assistance = await Assistance.findOne({
      where: { id: id, soft_delete: false },
    });

    if (assistance) {
      await assistance.update(body);
      res.json({
        msg: "La asistencia fue actualizada con exito",
      });
    } else {
      res.status(404).json({
        msg: `No existe una asistencia con el id ${id}`,
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
  const assistance = await Assistance.findOne({
    where: { id: id, soft_delete: false },
  });

  if (!assistance) {
    res.status(404).json({
      msg: `No existe una asistencia con el id ${id}`,
    });
  } else {
    await assistance.update({ soft_delete: true });
    res.json({
      msg: "La asistencia fue eliminada con exito!",
    });
  }
};