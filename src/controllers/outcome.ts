import { Request, Response } from "express";
import { Outcome } from "../models/outcome";

export const getOutcomes = async (req: Request, res: Response) => {
  const listOutcomes = await Outcome.findAll({
    where: { soft_delete: false },
    include: { all: true, nested: true },
  });
  res.json(listOutcomes);
};

export const getOutcomesOnly = async (req: Request, res: Response) => {
    const listOutcomes = await Outcome.findAll({
      where: { soft_delete: false },
    });
    res.json(listOutcomes);
  };

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const outcome = await Outcome.findOne({
    where: { id: id, soft_delete: false },
    include: { all: true, nested: true },
  });

  if (outcome) {
    res.json(outcome);
  } else {
    res.status(404).json({
      msg: `No existe un ingreso con el id ${id}`,
    });
  }
};

export const getByBooking = async (req: Request, res: Response) => {
  const { id } = req.params;
  const listOutcomes = await Outcome.findAll({
    where: { bookingId: id, soft_delete: false },
    include: { all: true },
  });

  if (listOutcomes) {
    res.json(listOutcomes);
  } else {
    res.status(404).json({
      msg: `No existen egresos en la reserva con el id ${id}`,
    });
  }
};

export const getBySupplier = async (req: Request, res: Response) => {
  const { id } = req.params;
  const listOutcomes = await Outcome.findAll({
    where: { supplierId: id, soft_delete: false },
    include: { all: true },
  });

  if (listOutcomes) {
    res.json(listOutcomes);
  } else {
    res.status(404).json({
      msg: `No existen ingresos en el proveedor con el id ${id}`,
    });
  }
};

export const getByCount = async (req: Request, res: Response) => {
  const { id } = req.params;
  const listOutcomes = await Outcome.findAll({
    where: { countId: id, soft_delete: false },
    include: { all: true },
  });

  if (listOutcomes) {
    res.json(listOutcomes);
  } else {
    res.status(404).json({
      msg: `No existen ingresos en la cuenta con el id ${id}`,
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const outcome = await Outcome.create(body);

    res.json(outcome);
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
    const outcome = await Outcome.findOne({
      where: { id: id, soft_delete: false },
    });

    if (outcome) {
      await outcome.update(body);
      res.json({
        msg: "El egreso fue actualizado con exito",
      });
    } else {
      res.status(404).json({
        msg: `No existe un egreso con el id ${id}`,
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
  const outcome = await Outcome.findOne({
    where: { id: id, soft_delete: false },
  });

  if (!outcome) {
    res.status(404).json({
      msg: `No existe un egreso con el id ${id}`,
    });
  } else {
    await outcome.update({ soft_delete: true });
    res.json({
      msg: "El egreso fue eliminado con exito!",
    });
  }
};
