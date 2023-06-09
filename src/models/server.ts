import express from "express";
import cors from "cors";

import clientsRouter from "../routes/client";
import usersRouter from "../routes/user";
import countsRouter from "../routes/count";
import suppliersRouter from "../routes/supplier";
import organizationRouter from "../routes/organization";
import orderRouter from "../routes/order";
import budgetRouter from "../routes/budget";
import flightRouter from "../routes/flight";
import sectionRouter from "../routes/section";
import transferRouter from "../routes/transfer";
import assistanceRouter from "../routes/assistance";
import excursionRouter from "../routes/excursion";
import cannedRouter from "../routes/canned";
import itemRouter from "../routes/item";
import accommodationRouter from "../routes/accommodation"
import hotelRouter from "../routes/hotel"
import extraRouter from "../routes/extra"
import bookingRouter from "../routes/booking"
import paxRouter from "../routes/pax"
import incomeRouter from "../routes/income"
import outcomeRouter from "../routes/outcome"

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
import { Outcome } from "./outcome";
import { Section } from "./section";
import { Accommodation } from "./accommodation";
import { Extra } from "./extra";
import { Item } from "./item";

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
    this.app.use("/api/counts", countsRouter);
    this.app.use("/api/suppliers", suppliersRouter);
    this.app.use("/api/organization", organizationRouter);
    this.app.use("/api/orders", orderRouter);
    this.app.use("/api/budgets", budgetRouter);
    this.app.use("/api/flights", flightRouter);
    this.app.use("/api/sections", sectionRouter);
    this.app.use("/api/accommodations", accommodationRouter);
    this.app.use("/api/hotels", hotelRouter);
    this.app.use("/api/extras", extraRouter);
    this.app.use("/api/transfers", transferRouter);
    this.app.use("/api/assistances", assistanceRouter);
    this.app.use("/api/excursions", excursionRouter);
    this.app.use("/api/canneds", cannedRouter);
    this.app.use("/api/items", itemRouter);
    this.app.use("/api/bookings", bookingRouter);
    this.app.use("/api/paxes", paxRouter);
    this.app.use("/api/incomes", incomeRouter);
    this.app.use("/api/outcomes", outcomeRouter);
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
      await Item.sync();
      await Section.sync();
      await Accommodation.sync();
      await Hotel.sync();
      await Extra.sync();
      await Transfer.sync();
      await Booking.sync({alter:true});
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
