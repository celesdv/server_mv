import { Request, Response } from "express";
import { Supplier } from "../models/supplier";

export const getSuppliers = async (req: Request, res: Response) => {
  const listSuppliers = await Supplier.findAll({
    where: { soft_delete: false },
  });
  res.json(listSuppliers);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const supplier = await Supplier.findOne({
    where: { id: id, soft_delete: false },
  });

  if (supplier) {
    res.json(supplier);
  } else {
    res.status(404).json({
      msg: `No existe un provedor con el id ${id}`,
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  const supplier = await Supplier.findOne({ where: { name: body.name } });

  if (supplier) {
    return res.status(400).json({
      msg: `¡El proveedor ${body.name} ya existe!`,
    });
  }

  try {
    await Supplier.create(body);

    res.json({
      msg: `El proveedor fue agregado con exito!`,
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
    const supplier = await Supplier.findOne({
      where: { id: id, soft_delete: false },
    });

    if (supplier) {
      await supplier.update(body);
      res.json({
        msg: "El proveedor fue actualizado con exito",
      });
    } else {
      res.status(404).json({
        msg: `No existe un proveedor con el id ${id}`,
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
  const supplier = await Supplier.findOne({
    where: { id: id, soft_delete: false },
  });

  if (!supplier) {
    res.status(404).json({
      msg: `No existe un proveedor con el id ${id}`,
    });
  } else {
    await supplier.update({ soft_delete: true });
    res.json({
      msg: "El proveedor fue eliminado con exito!",
    });
  }
};
