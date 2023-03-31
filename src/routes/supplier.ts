import { Router } from "express";
import { create, getById, getSuppliers, softDelete, update } from "../controllers/supplier";
import { isAdmin, validateToken } from "./validations";

const router = Router();

router.get("/", validateToken, getSuppliers);
router.get('/:id', validateToken, getById);
router.delete('/:id',[validateToken, isAdmin], softDelete);
router.post('/', [validateToken, isAdmin], create );
router.put('/:id', [validateToken, isAdmin], update);

export default router;