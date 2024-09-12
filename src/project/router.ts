import { Router } from "express";
import { ProjectController } from "./controller";

const router = Router();

router.get("/projetos", ProjectController.listProjects);
router.post("/projetos", ProjectController.createProject);
router.put("/projetos/:id", ProjectController.updateProject);
router.delete("/projetos/:id", ProjectController.deleteProject);

export default router;
