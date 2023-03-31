import { Request, Response } from "express";
import { Count } from "../models/count";

export const getCounts = async (req: Request, res: Response) => {
  const listCounts = await Count.findAll({ where: { soft_delete: false } });
  res.json(listCounts);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const count = await Count.findOne({
    where: { id: id, soft_delete: false },
  });

  if (count) {
    res.json(count);
  } else {
    res.status(404).json({
      msg: `No existe una cuenta con el id ${id}`,
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await Count.create(body);

    res.json({
      msg: `La cuenta fue agregada con exito!`,
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
    const count = await Count.findOne({
      where: { id: id, soft_delete: false },
    });

    if (count) {
      await count.update(body);
      res.json({
        msg: "La cuenta fue actualizada con exito",
      });
    } else {
      res.status(404).json({
        msg: `No existe una cuenta con el id ${id}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      msg: `Upps ocurrio un error, comuniquese con soporte`,
    });
  }
};

export const softDelete = async (req: Request, res: Response) => {
  const { id } = req.params;
  const count = await Count.findOne({
    where: { id: id, soft_delete: false },
  });

  if (!count) {
    res.status(404).json({
      msg: `No existe una cuenta con el id ${id}`,
    });
  } else {
    await count.update({ soft_delete: true });
    res.json({
      msg: "La cuenta fue eliminada con exito!",
    });
  }
};
