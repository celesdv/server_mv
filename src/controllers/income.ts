import { Request, Response } from "express";
import { Income } from "../models/income";

export const getIncomes = async (req: Request, res: Response) => {
  const listIncomes = await Income.findAll({
    where: { soft_delete: false },
    include: { all: true, nested: true },
  });
  res.json(listIncomes);
};

export const getIncomesOnly = async (req: Request, res: Response) => {
    const listIncomes = await Income.findAll({
      where: { soft_delete: false },
    });
    res.json(listIncomes);
  };

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const income = await Income.findOne({
    where: { id: id, soft_delete: false },
    include: { all: true, nested: true },
  });

  if (income) {
    res.json(income);
  } else {
    res.status(404).json({
      msg: `No existe un ingreso con el id ${id}`,
    });
  }
};

export const getByBooking = async (req: Request, res: Response) => {
  
  const { id } = req.params;
  console.log(id)
  const listIncomes = await Income.findAll({
    where: { bookingId: id, soft_delete: false },
  });

  if (listIncomes) {
    res.json(listIncomes);
  } else {
    res.status(404).json({
      msg: `No existen ingresos en la reserva con el id ${id}`,
    });
  }
};

export const getByClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const listIncomes = await Income.findAll({
    where: { clientId: id, soft_delete: false },
    include: { all: true },
  });

  if (listIncomes) {
    res.json(listIncomes);
  } else {
    res.status(404).json({
      msg: `No existen ingresos en el cliente con el id ${id}`,
    });
  }
};

export const getByCount = async (req: Request, res: Response) => {
  
  const { id } = req.params;
  const listIncomes = await Income.findAll({
    where: { countId: id, soft_delete: false },
    include: { all: true },
  });

  if (listIncomes) {
    res.json(listIncomes);
  } else {
    res.status(404).json({
      msg: `No existen ingresos en la cuenta con el id ${id}`,
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const income = await Income.create(body);

    res.json(income);
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
    const income = await Income.findOne({
      where: { id: id, soft_delete: false },
    });

    if (income) {
      await income.update(body);
      res.json({
        msg: "El ingreso fue actualizado con exito",
      });
    } else {
      res.status(404).json({
        msg: `No existe un ingreso con el id ${id}`,
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
  const income = await Income.findOne({
    where: { id: id, soft_delete: false },
  });

  if (!income) {
    res.status(404).json({
      msg: `No existe un ingreso con el id ${id}`,
    });
  } else {
    await income.update({ soft_delete: true });
    res.json({
      msg: "El ingreso fue eliminado con exito!",
    });
  }
};
