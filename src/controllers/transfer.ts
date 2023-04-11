import { Request, Response } from "express";
import { Transfer } from "../models/transfer";

export const getTransfers = async (req: Request, res: Response) => {
  const listTransfers = await Transfer.findAll({
    where: { soft_delete: false },
    include: { all: true },
  });
  res.json(listTransfers);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const transfer = await Transfer.findOne({
    where: { id: id, soft_delete: false },
    include: { all: true },
  });

  if (transfer) {
    res.json(transfer);
  } else {
    res.status(404).json({
      msg: `No existe un traslado con el id ${id}`,
    });
  }
};

export const getByBudget = async (req: Request, res: Response) => {
  const { id } = req.params;
  const listTransfers = await Transfer.findAll({
    where: { budgetId: id, soft_delete: false },
    include: { all: true },
  });

  if (listTransfers) {
    res.json(listTransfers);
  } else {
    res.status(404).json({
      msg: `No existen traslados en el presupuesto con el id ${id}`,
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await Transfer.create(body);

    res.json({
      msg: `El traslado fue agregado con exito!`,
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
    const transfer = await Transfer.findOne({
      where: { id: id, soft_delete: false },
    });

    if (transfer) {
      await transfer.update(body);
      res.json({
        msg: "El traslado fue actualizado con exito",
      });
    } else {
      res.status(404).json({
        msg: `No existe un traslado con el id ${id}`,
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
  const transfer = await Transfer.findOne({
    where: { id: id, soft_delete: false },
  });

  if (!transfer) {
    res.status(404).json({
      msg: `No existe un traslado con el id ${id}`,
    });
  } else {
    await transfer.update({ soft_delete: true });
    res.json({
      msg: "El traslado fue eliminado con exito!",
    });
  }
};
