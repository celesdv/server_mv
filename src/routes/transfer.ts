import { Router } from "express";
import { create, getByBudget, getById, getTransfers, softDelete, update } from "../controllers/transfer";
import { validateToken } from "./validations";

const router = Router();

router.get("/", validateToken, getTransfers);
router.get('/:id', validateToken, getById);
router.get('/budget/:id', validateToken, getByBudget);
router.delete('/:id', validateToken, softDelete);
router.post('/', validateToken, create);
router.put('/:id', validateToken, update);

export default router;