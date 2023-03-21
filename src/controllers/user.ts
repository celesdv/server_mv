import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

export const newUser = async (req: Request, res: Response) => {
  const { email, password, first_name, last_name, phone } = req.body;

  const user = await User.findOne({ where: { email: email } });

  if (user) {
    return res.status(400).json({
      msg: `User ${email} already exists!`,
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
      msg: `User ${email} created successfully`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something goes wrong",
      error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user: any = await User.findOne({ where: { email: email } });

  if (!user) {
    return res.status(404).json({
      msg: `User ${email} not found`,
    });
  }

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    return res.status(401).json({
      msg: `Password is incorrect`,
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

  res.json({token});  
};
