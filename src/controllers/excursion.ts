import { Request, Response } from "express";
import { Excursion } from "../models/excursion";

export const getExcursions = async (req: Request, res: Response) => {
    const listExcurions = await Excursion.findAll({
        where: { soft_delete: false },
        include: { all: true },
      });
      res.json(listExcurions);
};

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params;
  const excursion = await Excursion.findOne({
    where: { id: id, soft_delete: false },
    include: { all: true },
  });

  if (excursion) {
    res.json(excursion);
  } else {
    res.status(404).json({
      msg: `No existe una excursión con el id ${id}`,
    });
  }
};

export const getByBudget = async (req: Request, res: Response) => {
    const { id } = req.params;
  const listExcursions = await Excursion.findAll({
    where: { budgetId: id, soft_delete: false },
    include: { all: true },
  });

  if  (listExcursions) {
    res.json(listExcursions);
  } else {
    res.status(404).json({
      msg: `No existen excursiones en el presupuesto con el id ${id}`,
    });
  }
};

export const create = async (req: Request, res: Response) => {
    const { body } = req;

  try {
    await Excursion.create(body);

    res.json({
      msg: `La excursión fue agregada con exito!`,
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
    const excursion = await Excursion.findOne({
      where: { id: id, soft_delete: false },
    });

    if (excursion) {
      await excursion.update(body);
      res.json({
        msg: "La excursión fue actualizada con exito",
      });
    } else {
      res.status(404).json({
        msg: `No existe una excursión con el id ${id}`,
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
  const excursion = await Excursion.findOne({
    where: { id: id, soft_delete: false },
  });

  if (!excursion) {
    res.status(404).json({
      msg: `No existe una excursión con el id ${id}`,
    });
  } else {
    await excursion.update({ soft_delete: true });
    res.json({
      msg: "La excursión fue eliminada con exito!",
    });
  }
};
