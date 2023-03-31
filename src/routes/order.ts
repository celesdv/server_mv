import { Router } from "express";
import {
  create,
  getById,
  getOrders,
  softDelete,
  update,
} from "../controllers/order";
import { validateToken } from "./validations";

const router = Router();

router.get("/", validateToken, getOrders);
router.get("/:id", validateToken, getById);
router.delete("/:id", validateToken, softDelete);
router.post("/", validateToken, create);
router.put("/:id", validateToken, update);

export default router;
