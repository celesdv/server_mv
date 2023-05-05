import { Request, Response } from "express";
import { Booking } from "../models/booking";
import { Pax } from "../models/pax";

export const getBookings = async (req: Request, res: Response) => {
  const listBookings = await Booking.findAll({
    where: { soft_delete: false },
    include: { all: true, nested: true },
  });
  res.json(listBookings);
};

export const getBookingsOnly = async (req: Request, res: Response) => {
  const listBookings = await Booking.findAll({
    where: { soft_delete: false }
  });
  res.json(listBookings);
};

export const getByClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const listBookings = await Booking.findAll({
    where: { idClient: id, soft_delete: false },
    include: { all: true },
  });
  
  if (listBookings) {
    res.json(listBookings);
  } else {
    res.status(404).json({
      msg: `No existe una reserva en el cliente con id ${id}`,
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const booking = await Booking.findOne({
    where: { id: id, soft_delete: false },
    include: { all: true, nested: true },
  });

  if (booking) {
    res.json(booking);
  } else {
    res.status(404).json({
      msg: `No existe una reserva con el id ${id}`,
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const booking = await Booking.create(body, {
      include: [Pax],
    });

    res.json(booking);
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
    const booking = await Booking.findOne({
      where: { id: id, soft_delete: false },
    });

    if (booking) {
      await booking.update(body);
      res.json({
        msg: "La reserva fue actualizada con exito",
      });
    } else {
      res.status(404).json({
        msg: `No existe una reserva con el id ${id}`,
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
  const booking = await Booking.findOne({
    where: { id: id, soft_delete: false },
  });

  if (!booking) {
    res.status(404).json({
      msg: `No existe una reserva con el id ${id}`,
    });
  } else {
    await booking.update({ soft_delete: true });
    res.json({
      msg: "La reserva fue eliminada con exito!",
    });
  }
};
