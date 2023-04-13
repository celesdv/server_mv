import { Router } from "express";
import { create, getByAccommodation, getById, getHotels, softDelete, update } from "../controllers/hotel";
import { validateToken } from "./validations";

const router = Router();

router.get("/", validateToken, getHotels);
router.get('/:id', validateToken, getById);
router.get('/accommodtion/:id', validateToken, getByAccommodation);
router.delete('/:id', validateToken, softDelete);
router.post('/', validateToken, create);
router.put('/:id', validateToken, update);

export default router;