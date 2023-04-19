import { Router } from "express";
import { create, getById, getPaxes, softDelete, update } from "../controllers/pax";
import { validateToken } from "./validations";

const router = Router();

router.get("/", validateToken, getPaxes);
router.get('/:id', validateToken, getById);
router.delete('/:id', validateToken, softDelete);
router.post('/', validateToken, create );
router.put('/:id', validateToken, update);

export default router;