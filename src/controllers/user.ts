import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user: any = await User.findOne({ where: { email: email } });

  if (!user) {
    return res.status(404).json({
      msg: `¡Usuario ${email} no existe!`,
    });
  }

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    return res.status(401).json({
      msg: `¿Has olvidado tu contraseña? Ponte en contacto con el Administrador`,
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      roleId: user.roleId,
      first_name: user.first_name,
      last_name: user.last_name,
    },
    process.env.SECRET_KEY || "melcejviajes",
    {
      expiresIn: 86400, //24hs
    }
  );

  res.json({ token });
};

export const updatePassword = async (req: Request, res: Response) => {
  const { password } = req.body;
  const { id } = req.params;
  const encripted = await bcrypt.hash(password, 10);

  try {
    const user = await User.findOne({
      where: { id: id, soft_delete: false },
    });

    if (user) {
      await user.update({ password: encripted });
      res.json({
        msg: "La contraseña fue actualizado con exito",
      });
    } else {
      res.status(404).json({
        msg: `No existe un usuario con el id ${id}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Upps ocurrio un error, comuniquese con soporte`,
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { email, password, first_name, last_name, phone } = req.body;

  const user = await User.findOne({ where: { email: email } });

  if (user) {
    return res.status(400).json({
      msg: `¡Este email ${email} ya existe!`,
    });
  }

  const encripted = await bcrypt.hash(password, 10);

  try {
    await User.create({
      email: email,
      password: encripted,
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      roleId: 2,
    });

    res.status(201).json({
      msg: `¡Usuario ${email} creado exitosamente!`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Upps ocurrio un error, comuniquese con soporte",
      error,
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const listUsers = await User.findAll({
    where: { soft_delete: false },
    include: { all: true },
  });
  res.json(listUsers);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id: id, soft_delete: false },
    include: { all: true },
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      msg: `No existe un usuario con el id ${id}`,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  // const { password} = req.body;
  // const encripted = await bcrypt.hash(password, 10);

  try {
    const user = await User.findOne({
      where: { id: id, soft_delete: false },
    });

    if (user) {
      await user.update(body);
      // await user.update({ password: encripted });
      res.json({
        msg: "El usuario fue actualizado con exito",
      });
    } else {
      res.status(404).json({
        msg: `No existe un usuario con el id ${id}`,
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
  const user = await User.findOne({
    where: { id: id, soft_delete: false },
  });

  if (!user) {
    res.status(404).json({
      msg: `No existe un usuario con el id ${id}`,
    });
  } else {
    await user.update({ soft_delete: true });
    res.json({
      msg: "El usuario fue eliminado con exito!",
    });
  }
};
