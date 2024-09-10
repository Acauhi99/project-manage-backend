import { Router } from "express";
import { UserController } from "./userController";

const router = Router();

router.get("/projetos/:projetoId/usuarios", UserController.listUsersInProject);
router.post("/projetos/:projetoId/usuarios", UserController.addUserToProject);
router.delete(
  "/projetos/:projetoId/usuarios/:usuarioId",
  UserController.removeUserFromProject
);

export default router;
