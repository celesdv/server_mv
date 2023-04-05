import { Request, Response } from "express";
import { Section } from "../models/section";

export const getSections = async (req: Request, res: Response) => {
  const listSections = await Section.findAll({
    where: { soft_delete: false },
    include: { all: true },
  });
  res.json(listSections);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const section = await Section.findOne({
    where: { id: id, soft_delete: false },
    include: { all: true },
  });

  if (section) {
    res.json(section);
  } else {
    res.status(404).json({
      msg: `No existe un tramo con el id ${id}`,
    });
  }
};

export const getByFlight = async (req: Request, res: Response) => {
  const { id } = req.params;
  const listSections = await Section.findAll({
    where: { flightId: id, soft_delete: false },
    include: { all: true },
  });

  if (listSections) {
    res.json(listSections);
  } else {
    res.status(404).json({
      msg: `No existen tramos en el servicio áereo con el id ${id}`,
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await Section.create(body);

    res.json({
      msg: `El tramo fue agregado con exito!`,
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
    const section = await Section.findOne({
      where: { id: id, soft_delete: false },
    });

    if (section) {
      await section.update(body);
      res.json({
        msg: "El tramo fue actualizado con exito",
      });
    } else {
      res.status(404).json({
        msg: `No existe un tramo con el id ${id}`,
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
  const section = await Section.findOne({
    where: { id: id, soft_delete: false },
  });

  if (!section) {
    res.status(404).json({
      msg: `No existe un tramo con el id ${id}`,
    });
  } else {
    await section.update({ soft_delete: true });
    res.json({
      msg: "El tramo fue eliminado con exito!",
    });
  }
};
