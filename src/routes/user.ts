import { Router } from "express";
import { login, create, getUsers, getById, softDelete, update, updatePassword } from "../controllers/user";
import { isAdmin, validateToken } from "./validations";

const router = Router();

router.post("/login", login);

router.get("/", validateToken, getUsers);
router.get("/:id", validateToken, getById);
router.post("/", [validateToken, isAdmin], create);
router.delete("/:id", [validateToken, isAdmin], softDelete);
router.put("/:id", [validateToken, isAdmin], update);

router.put("/:id/password", validateToken, updatePassword);

export default router;
