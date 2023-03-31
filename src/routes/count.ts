import { Router } from "express";
import { create, getById, getCounts, softDelete, update } from "../controllers/count";
import { isAdmin, validateToken } from "./validations";

const router = Router();

router.get("/", validateToken, getCounts);
router.get('/:id', validateToken, getById);
router.delete('/:id',[validateToken, isAdmin], softDelete);
router.post('/', [validateToken, isAdmin], create );
router.put('/:id', [validateToken, isAdmin], update);

export default router;