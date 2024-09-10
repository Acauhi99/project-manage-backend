import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { errorHandler } from "./userErrors";
import { UserService } from "./userService";

export const UserController = {
  listUsersInProject: async (req: Request, res: Response) => {
    const { projetoId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    try {
      const { users, total } = await UserService.listUsersInProject(
        Number(projetoId),
        page,
        limit
      );
      res.status(StatusCodes.OK).json({ users, total, page, limit });
    } catch (error) {
      errorHandler(error as Error, res);
    }
  },

  addUserToProject: async (req: Request, res: Response) => {
    const { projetoId } = req.params;
    const { usuario_id } = req.body;

    try {
      const user = await UserService.addUserToProject(
        Number(projetoId),
        Number(usuario_id)
      );
      res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      errorHandler(error as Error, res);
    }
  },

  removeUserFromProject: async (req: Request, res: Response) => {
    const { projetoId, usuarioId } = req.params;

    try {
      await UserService.removeUserFromProject(
        Number(projetoId),
        Number(usuarioId)
      );
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      errorHandler(error as Error, res);
    }
  },
};
