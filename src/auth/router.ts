import { Router } from "express";
import { AuthController } from "./controller";

const router = Router();

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.post("/me", AuthController.decodeUser);

export default router;
