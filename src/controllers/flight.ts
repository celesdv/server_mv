import { Request, Response } from "express";
import { Flight } from "../models/flight";
import { Section } from "../models/section";

export const getFlights = async (req: Request, res: Response) => {
  const listFlights = await Flight.findAll({
    where: { soft_delete: false },
    include: { all: true },
  });
  res.json(listFlights);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const flight = await Flight.findOne({
    where: { id: id, soft_delete: false },
    include: { all: true },
  });

  if (flight) {
    res.json(flight);
  } else {
    res.status(404).json({
      msg: `No existe un servicio áereo con el id ${id}`,
    });
  }
};

export const getByBudget = async (req: Request, res: Response) => {
  const { id } = req.params;
  const listFlights = await Flight.findAll({
    where: { budgetId: id, soft_delete: false },
    include: { all: true },
  });

  if (listFlights) {
    res.json(listFlights);
  } else {
    res.status(404).json({
      msg: `No existen servicios áereo en el presupuesto con el id ${id}`,
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await Flight.create(body, {
      include: [Section],
    });

    res.json({
      msg: `El servicio aéreo fue agregado con exito!`,
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
    const flight = await Flight.findOne({
      where: { id: id, soft_delete: false },
    });

    if (flight) {
      await flight.update(body);
      res.json({
        msg: "El servicio áereo fue actualizado con exito",
      });
    } else {
      res.status(404).json({
        msg: `No existe un servicio áereo con el id ${id}`,
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
  const flight = await Flight.findOne({
    where: { id: id, soft_delete: false },
  });

  if (!flight) {
    res.status(404).json({
      msg: `No existe un servicio áereo con el id ${id}`,
    });
  } else {
    await flight.update({ soft_delete: true });
    res.json({
      msg: "El servicio áereo fue eliminado con exito!",
    });
  }
};
