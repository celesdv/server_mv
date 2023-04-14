import { Request, Response } from "express";
import { Hotel } from "../models/hotel";

export const getHotels = async (req: Request, res: Response) => {
  const listHotels = await Hotel.findAll({
    where: { soft_delete: false },
    include: { all: true },
  });
  res.json(listHotels);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const hotel = await Hotel.findOne({
    where: { id: id, soft_delete: false },
    include: { all: true },
  });

  if (hotel) {
    res.json(hotel);
  } else {
    res.status(404).json({
      msg: `No existe un hotel con el id ${id}`,
    });
  }
};

export const getByAccommodation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const listHotels = await Hotel.findAll({
    where: { accommodationId: id, soft_delete: false },
    include: { all: true },
  });

  if (listHotels) {
    res.json(listHotels);
  } else {
    res.status(404).json({
      msg: `No existen hoteles en el alojamiento con el id ${id}`,
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const hotel = await Hotel.create(body);

    res.json(hotel);
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
    const hotel = await Hotel.findOne({
      where: { id: id, soft_delete: false },
    });

    if (hotel) {
      await hotel.update(body);
      res.json({
        msg: "El hotel fue actualizado con exito",
      });
    } else {
      res.status(404).json({
        msg: `No existe un hotel con el id ${id}`,
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
  const hotel = await Hotel.findOne({
    where: { id: id, soft_delete: false },
  });

  if (!hotel) {
    res.status(404).json({
      msg: `No existe un hotel con el id ${id}`,
    });
  } else {
    await hotel.update({ soft_delete: true });
    res.json({
      msg: "El hotel fue eliminado con exito!",
    });
  }
};
