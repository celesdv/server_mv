import { Request, Response } from "express";
import { Organization } from "../models/organization";

export const getById = async (req: Request, res: Response) => {
  const org = await Organization.findByPk(1);

  if (org) {
    res.json(org);
  } else {
    res.status(404).json({
      msg: `No existe datos de la empresa`,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const org = await Organization.findByPk(1);

    if (org) {
      await org.update(body);
      res.json({
        msg: "Los datos de la empresa fueron actualizados con exito!",
      });
    } else {
      res.status(404).json({
        msg: `No existe datos de la empresa`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      msg: `Upps ocurrio un error, comuniquese con soporte`,
    });
  }
};
