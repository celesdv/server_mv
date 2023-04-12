import { Request, Response } from "express";
import { Item } from "../models/item";

export const getItems = async (req: Request, res: Response) => {
  const listItems = await Item.findAll({
    where: { soft_delete: false },
    include: { all: true },
  });
  res.json(listItems);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await Item.findOne({
    where: { id: id, soft_delete: false },
    include: { all: true },
  });

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({
      msg: `No existe un item extra con el id ${id}`,
    });
  }
};

export const getByBudget = async (req: Request, res: Response) => {
  const { id } = req.params;
  const listItems = await Item.findAll({
    where: { budgetId: id, soft_delete: false },
    include: { all: true },
  });

  if  (listItems) {
    res.json(listItems);
  } else {
    res.status(404).json({
      msg: `No existen items extras en el presupuesto con el id ${id}`,
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await Item.create(body);

    res.json({
      msg: `El Item extra fue agregado con exito!`,
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
    const item = await Item.findOne({
      where: { id: id, soft_delete: false },
    });

    if (item) {
      await item.update(body);
      res.json({
        msg: "El item extra fue actualizado con exito",
      });
    } else {
      res.status(404).json({
        msg: `No existe un item extra con el id ${id}`,
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
  const item = await Item.findOne({
    where: { id: id, soft_delete: false },
  });

  if (!item) {
    res.status(404).json({
      msg: `No existe un item extra con el id ${id}`,
    });
  } else {
    await item.update({ soft_delete: true });
    res.json({
      msg: "El item extra fue eliminado con exito!",
    });
  }
};