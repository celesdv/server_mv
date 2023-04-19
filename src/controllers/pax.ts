import { Request, Response } from "express";
import { Pax } from "../models/pax";

export const getPaxes = async (req: Request, res: Response) => {
  const listPaxes = await Pax.findAll({
    where: { soft_delete: false },
    include: { all: true },
  });
  res.json(listPaxes);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const pax = await Pax.findOne({
    where: { id: id, soft_delete: false },
    include: { all: true },
  });

  if (pax) {
    res.json(pax);
  } else {
    res.status(404).json({
      msg: `No existe un pasajero con el id ${id}`,
    });
  }
};

export const getByBooking = async (req: Request, res: Response) => {
  const { id } = req.params;
  const listPaxes = await Pax.findAll({
    where: { bookingId: id, soft_delete: false },
    include: { all: true },
  });

  if (listPaxes) {
    res.json(listPaxes);
  } else {
    res.status(404).json({
      msg: `No existen pasajeros en la reserva con el id ${id}`,
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const pax = await Pax.create(body);

    res.json(pax);
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
    const pax = await Pax.findOne({
      where: { id: id, soft_delete: false },
    });

    if (pax) {
      await pax.update(body);
      res.json({
        msg: "El pasajero fue actualizado con exito",
      });
    } else {
      res.status(404).json({
        msg: `No existe un pasajero con el id ${id}`,
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
  const pax = await Pax.findOne({
    where: { id: id, soft_delete: false },
  });

  if (!pax) {
    res.status(404).json({
      msg: `No existe un pasajero con el id ${id}`,
    });
  } else {
    await pax.update({ soft_delete: true });
    res.json({
      msg: "El pasajero fue eliminado con exito!",
    });
  }
};
