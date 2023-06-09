import { Router } from "express";
import { create, getById, getClients, softDelete, update } from "../controllers/client";
import { validateToken } from "./validations";

const router = Router();

router.get("/", validateToken, getClients);
router.get('/:id', validateToken, getById);
router.delete('/:id', validateToken, softDelete);
router.post('/', validateToken, create );
router.put('/:id', validateToken, update);

export default router;
