import { Router } from "express";
import { create, getById, getBudgets, softDelete, update } from "../controllers/budget";
import { validateToken } from "./validations";

const router = Router();

router.get("/", validateToken, getBudgets);
router.get('/:id', validateToken, getById);
router.delete('/:id', validateToken, softDelete);
router.post('/', validateToken, create );
router.put('/:id', validateToken, update);

export default router;
