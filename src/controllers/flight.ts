import { Request, Response } from "express";
import { Flight } from "../models/flight";
import { Section } from "../models/section";

export const getFlights = async (req: Request, res: Response) => { };

export const getById = (req: Request, res: Response) => { };

export const getByBudget = (req: Request, res: Response) => { };

export const create = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Flight.create(body, {
            include: [Section]
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

export const update = (req: Request, res: Response) => { };

export const softDelete = (req: Request, res: Response) => { };
