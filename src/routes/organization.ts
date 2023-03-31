import { Router } from "express";
import { getById, update } from "../controllers/organization";
const router = Router();

router.get('/', getById);
router.put('/', update);

export default router;