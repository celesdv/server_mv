import { Request, Response } from "express";
import { Order } from "../models/order";

export const getOrders = async (req: Request, res: Response) => {
  const orderClients = await Order.findAll({
    where: { soft_delete: false },
  });
  res.json(orderClients);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: { id: id, soft_delete: false },
  });

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({
      msg: `No existe un pedido con el id ${id}`,
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await Order.create(body);

    res.json({
      msg: `El pedido fue agregada con exito!`,
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
    const order = await Order.findOne({
      where: { id: id, soft_delete: false },
    });

    if (order) {
      await order.update(body);
      res.json({
        msg: "El pedido fue actualizado con exito",
      });
    } else {
      res.status(404).json({
        msg: `No existe un pedido a con el id ${id}`,
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
  const order = await Order.findOne({
    where: { id: id, soft_delete: false },
  });

  if (!order) {
    res.status(404).json({
      msg: `No existe un pedido con el id ${id}`,
    });
  } else {
    await order.update({ soft_delete: true });
    res.json({
      msg: "El pedido fue eliminado con exito!",
    });
  }
};

export const isBudget = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await Order.findOne({
    where: { id: id, soft_delete: false },
  });

  if (!order) {
    res.status(404).json({
      msg: `No existe un pedido con el id ${id}`,
    });
  } else {
    await order.update({ is_budget: true });
    res.json({
      msg: "El pedido fue presupuestado con exito!",
    });
  }
};
