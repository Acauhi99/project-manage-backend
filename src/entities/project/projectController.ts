import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { errorHandler } from "./projectErrors";
import { ProjectService } from "./projectService";

export const ProjectController = {
  listProjects: async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const { projects, total } = await ProjectService.listProjects(
        page,
        limit
      );
      res.status(StatusCodes.OK).json({ projects, total, page, limit });
    } catch (error) {
      errorHandler(error as Error, res);
    }
  },

  createProject: async (req: Request, res: Response) => {
    try {
      const project = await ProjectService.createProject(req.body);
      res.status(StatusCodes.CREATED).json(project);
    } catch (error) {
      errorHandler(error as Error, res);
    }
  },

  updateProject: async (req: Request, res: Response) => {
    try {
      const project = await ProjectService.updateProject(
        Number(req.params.id),
        req.body
      );
      res.status(StatusCodes.OK).json(project);
    } catch (error) {
      errorHandler(error as Error, res);
    }
  },

  deleteProject: async (req: Request, res: Response) => {
    try {
      await ProjectService.deleteProject(Number(req.params.id));
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      errorHandler(error as Error, res);
    }
  },
};
