import { Request, Response } from "express";
import { Extra } from "../models/extra";

export const getExtras = async (req: Request, res: Response) => {
  const listExtra = await Extra.findAll({
    where: { soft_delete: false },
    include: { all: true },
  });
  res.json(listExtra);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const extra = await Extra.findOne({
    where: { id: id, soft_delete: false },
    include: { all: true },
  });

  if (extra) {
    res.json(extra);
  } else {
    res.status(404).json({
      msg: `No existe un extra con el id ${id}`,
    });
  }
};

export const getByAccommodation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const listExtras = await Extra.findAll({
    where: { accommodationId: id, soft_delete: false },
    include: { all: true },
  });

  if (listExtras) {
    res.json(listExtras);
  } else {
    res.status(404).json({
      msg: `No existen extras en el alojamiento con el id ${id}`,
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const extra = await Extra.create(body);

    res.json(extra);
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
    const extra = await Extra.findOne({
      where: { id: id, soft_delete: false },
    });

    if (extra) {
      await extra.update(body);
      res.json({
        msg: "El extra fue actualizado con exito",
      });
    } else {
      res.status(404).json({
        msg: `No existe un extra con el id ${id}`,
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
  const extra = await Extra.findOne({
    where: { id: id, soft_delete: false },
  });

  if (!extra) {
    res.status(404).json({
      msg: `No existe un extra con el id ${id}`,
    });
  } else {
    await extra.update({ soft_delete: true });
    res.json({
      msg: "El extra fue eliminado con exito!",
    });
  }
};
