import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export class ProjectError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProjectError";
  }
}

export class ProjectNotFoundError extends ProjectError {
  constructor() {
    super("Projeto não encontrado.");
  }
}

export class ProjectNameExistsError extends ProjectError {
  constructor() {
    super("Projeto com o mesmo nome já existe.");
  }
}

export class ProjectNotCompletedError extends ProjectError {
  constructor() {
    super("Não é possível remover projetos não concluídos.");
  }
}

export class ProjectHasUsersError extends ProjectError {
  constructor() {
    super("Remova todos os usuários antes de deletar o projeto.");
  }
}

export const errorHandler = (error: Error, res: Response) => {
  if (error instanceof ProjectNotFoundError) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  } else if (error instanceof ProjectNameExistsError) {
    res.status(StatusCodes.CONFLICT).json({ message: error.message });
  } else if (error instanceof ProjectNotCompletedError) {
    res.status(StatusCodes.FORBIDDEN).json({ message: error.message });
  } else if (error instanceof ProjectHasUsersError) {
    res.status(StatusCodes.FORBIDDEN).json({ message: error.message });
  } else {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Erro ao processar a solicitação." });
  }
};
