import { Request, Response } from "express";
import { Accommodation } from "../models/accommodation";
import { Hotel } from "../models/hotel";
import { Extra } from "../models/extra";

export const getAccommodations = async (req: Request, res: Response) => {
  const listAccommodations = await Accommodation.findAll({
    where: { soft_delete: false },
    include: { all: true },
  });
  res.json(listAccommodations);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const accommodation = await Accommodation.findOne({
    where: { id: id, soft_delete: false },
    include: { all: true },
  });

  if (accommodation) {
    res.json(accommodation);
  } else {
    res.status(404).json({
      msg: `No existe un alojamiento con el id ${id}`,
    });
  }
};

export const getByBudget = async (req: Request, res: Response) => {
  const { id } = req.params;
  const listAccommodations = await Accommodation.findAll({
    where: { budgetId: id, soft_delete: false },
    include: { all: true },
  });

  if (listAccommodations) {
    res.json(listAccommodations);
  } else {
    res.status(404).json({
      msg: `No existen alojamientos en el presupuesto con el id ${id}`,
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await Accommodation.create(body, {
      include: [Hotel, Extra],
    });

    res.json({
      msg: `El alojamiento fue agregado con exito!`,
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
    const accommodation = await Accommodation.findOne({
      where: { id: id, soft_delete: false },
    });

    if (accommodation) {
      await accommodation.update(body)
      res.json({
        msg: "El alojamiento fue actualizado con exito",
      });
    } else {
      res.status(404).json({
        msg: `No existe un alojamiento con el id ${id}`,
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
  const accommodation = await Accommodation.findOne({
    where: { id: id, soft_delete: false },
  });

  if (!accommodation) {
    res.status(404).json({
      msg: `No existe un alojamiento con el id ${id}`,
    });
  } else {
    await accommodation.update({ soft_delete: true });
    res.json({
      msg: "El alojamiento fue eliminado con exito!",
    });
  }
};
