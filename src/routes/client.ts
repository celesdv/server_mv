import { Router } from "express";
import { getClients } from "../controllers/client";
import { isAdmin, validateToken } from "./validations";

const router = Router();

router.get("/", validateToken, getClients);

export default router;
