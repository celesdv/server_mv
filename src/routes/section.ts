import { Router } from "express";
import { create, getByFlight, getById, getSections, softDelete, update } from "../controllers/section";
import { validateToken } from "./validations";

const router = Router();

router.get("/", validateToken, getSections);
router.get('/:id', validateToken, getById);
router.get('/flight/:id', validateToken, getByFlight);
router.delete('/:id', validateToken, softDelete);
router.post('/', validateToken, create);
router.put('/:id', validateToken, update);

export default router;