import { Request, Response } from "express";
import { Canned } from "../models/canned";

export const getCanneds = async (req: Request, res: Response) => {
  const listCanneds = await Canned.findAll({
    where: { soft_delete: false },
    include: { all: true },
  });
  res.json(listCanneds);
};

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params;
  const canned = await Canned.findOne({
    where: { id: id, soft_delete: false },
    include: { all: true },
  });

  if (canned) {
    res.json(canned);
  } else {
    res.status(404).json({
      msg: `No existe un paquete enlatado con el id ${id}`,
    });
  }
};

export const getByBudget = async (req: Request, res: Response) => {
    const { id } = req.params;
    const listCanneds = await Canned.findAll({
      where: { budgetId: id, soft_delete: false },
      include: { all: true },
    });
  
    if (listCanneds) {
      res.json(listCanneds);
    } else {
      res.status(404).json({
        msg: `No existen paquetes enlatados en el presupuesto con el id ${id}`,
      });
    }
};

export const create = async (req: Request, res: Response) => {
    const { body } = req;

  try {
    await Canned.create(body);

    res.json({
      msg: `El paquete enlatado fue agregado con exito!`,
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
      const canned = await Canned.findOne({
        where: { id: id, soft_delete: false },
      });
  
      if (canned) {
        await canned.update(body);
        res.json({
          msg: "El paquete enlatado fue actualizado con exito",
        });
      } else {
        res.status(404).json({
          msg: `No existe un paquete enlatado con el id ${id}`,
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
  const canned = await Canned.findOne({
    where: { id: id, soft_delete: false },
  });

  if (!canned) {
    res.status(404).json({
      msg: `No existe un paquete enlatado con el id ${id}`,
    });
  } else {
    await canned.update({ soft_delete: true });
    res.json({
      msg: "El paquete enlatado fue eliminado con exito!",
    });
  }
};
