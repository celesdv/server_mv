import { Router } from "express";
import {
  create,
  getById,
  getBookings,
  getBookingsOnly,
  getBySupplier,
  getByClient,
  softDelete,
  update,
} from "../controllers/booking";
import { validateToken } from "./validations";

const router = Router();

router.get("/", validateToken, getBookings);
router.get("/bookings", validateToken, getBookingsOnly);
router.get("/:id/client", validateToken, getByClient);
router.get("/:id/supplier", validateToken, getBySupplier);
router.get("/:id", validateToken, getById);
router.delete("/:id", validateToken, softDelete);
router.post("/", validateToken, create);
router.put("/:id", validateToken, update);

export default router;
