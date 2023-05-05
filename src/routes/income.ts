import { Router } from "express";
import {
  create,
  getById,
  getIncomes,
  getIncomesOnly,
  getByBooking,
  getByClient,
  getByCount,
  softDelete,
  update,
} from "../controllers/income";
import { validateToken } from "./validations";

const router = Router();

router.get("/", validateToken, getIncomes);
router.get("/incomes", validateToken, getIncomesOnly);
router.get("/:id/booking", validateToken, getByBooking);
router.get("/:id/client", validateToken, getByClient);
router.get("/:id/count", validateToken, getByCount);
router.get("/:id", validateToken, getById);
router.delete("/:id", validateToken, softDelete);
router.post("/", validateToken, create);
router.put("/:id", validateToken, update);

export default router;
