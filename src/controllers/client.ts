import { Request, Response } from "express";
import { Client } from "../models/client";

export const getClients = async (req: Request, res: Response) => {
  const listClients = await Client.findAll({ where: { soft_delete: false } });
  res.json(listClients);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const client = await Client.findOne({
    where: { id: id, soft_delete: false },
  });

  if (client) {
    res.json(client);
  } else {
    res.status(404).json({
      msg: `No existe un cliente con el id ${id}`,
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await Client.create(body);

    res.json({
      msg: `El cliente fue agregado con exito!`,
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

    const client = await Client.findOne({
      where: { id: id, soft_delete: false },
    });

    if (client) {
      await client.update(body);
      res.json({
        msg: "El cliente fue actualizado con exito",
      });
    } else {
      res.status(404).json({
        msg: `No existe un cliente con el id ${id}`,
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
  const client = await Client.findOne({
    where: { id: id, soft_delete: false },
  });

  if (!client) {
    res.status(404).json({
      msg: `No existe un cliente con el id ${id}`,
    });
  } else {
    await client.update({ soft_delete: true });
    res.json({
      msg: "El cliente fue eliminado con exito!",
    });
  }
};
