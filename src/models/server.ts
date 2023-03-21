import express from "express";
import cors from "cors";
import clientsRouter from "../routes/client";
import usersRouter from "../routes/user";
import {
  createAdmin,
  createOrganization,
  createRoles,
} from "../libs/initialSetup";
import { Client } from "./client";
import { Role } from "./role";
import { User } from "./user";
import { Organization } from "./organization";
import { Count } from "./count";
import { Supplier } from "./supplier";
import { Order } from "./order";
import { Budget } from "./budget";
import { Assistance } from "./assistance";
import { Canned } from "./canned";
import { Excursion } from "./excursion";
import { Flight } from "./flight";
import { Hotel } from "./hotel";
import { Transfer } from "./transfer";
import { Booking } from "./booking";
import { Pax } from "./pax";
import { Income } from "./income";
import { Outcome } from "./outome";

class Server {
  private app: express.Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.listen();
    this.middleware();
    this.routes();
    this.dbConnect();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("App runing in port " + this.port);
    });
  }

  routes() {
    this.app.use("/api/clients", clientsRouter);
    this.app.use("/api/users", usersRouter);
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  async dbConnect() {
    try {
      //   await sequelize.drop();
      await Role.sync();
      await User.sync();
      await Client.sync();
      await Organization.sync();
      await Count.sync();
      await Supplier.sync();
      await Order.sync();
      await Budget.sync();
      await Assistance.sync();
      await Canned.sync();
      await Excursion.sync();
      await Flight.sync();
      await Hotel.sync();
      await Transfer.sync();
      await Booking.sync();
      await Pax.sync();
      await Income.sync();
      await Outcome.sync();

      this.initialSetup();
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  async initialSetup() {
    createRoles();
    createAdmin();
    createOrganization();
  }
}

export default Server;
