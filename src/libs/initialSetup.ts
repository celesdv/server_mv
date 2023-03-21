import bcrypt from "bcrypt";
import { Organization } from "../models/organization";
import { Role } from "../models/role";
import { User } from "../models/user";

export const createRoles = async () => {
  const roles = await Role.findAll();
  if (roles.length > 0) return;

  try {
    const newRoles = await Promise.all([
      newRol("Administador", "ADMIN"),
      newRol("Usuario", "USER"),
    ]);
  } catch (error) {
    console.log(error);
  }
};

async function newRol(description: string, name: string) {
  await Role.create({
    name: name,
    description: description,
  });
}

export const createAdmin = async () => {
  const users = await User.findAll();

  if (users.length > 0) return;

  try {
    const encripted = await bcrypt.hash("123456", 10);
    await User.create({
      email: "celesdv@gmail.com",
      password: encripted,
      first_name: "Celeste",
      last_name: "D Angelo",
      phone: "2634625679",
      roleId: 1,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createOrganization = async () => {
  const org = await Organization.findAll();

  if (org.length > 0) return;

  try {
    await Organization.create({
      name: "MELCEJ Viajes",
      email: "melcej.viajes@gmail.com",
      address: "Fleming 91, Rivadavia, Mendoza",
      facebook_url: "https://www.facebook.com/melcejviajes",
      instagram_url: "https://www.instagram.com/melcejviajes",
      phone_number: "263-4445360",
      about_us_text: "Agencia de Viajes y Turismo Nacional e Intenacional",
    });
  } catch (error) {
    console.log(error);
  }
};
