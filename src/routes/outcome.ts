import { Router } from "express";
import {
  create,
  getById,
  getOutcomes,
  getOutcomesOnly,
  getByBooking,
  getByCount,
  getBySupplier,
  softDelete,
  update,
} from "../controllers/outcome";
import { validateToken } from "./validations";

const router = Router();

router.get("/", validateToken, getOutcomes);
router.get("/outcome", validateToken, getOutcomesOnly);
router.get("/:id/booking", validateToken, getByBooking);
router.get("/:id/supplier", validateToken, getBySupplier);
router.get("/:id/count", validateToken, getByCount);
router.get("/:id", validateToken, getById);
router.delete("/:id", validateToken, softDelete);
router.post("/", validateToken, create);
router.put("/:id", validateToken, update);

export default router;
