import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export class UserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserError";
  }
}

export class ProjectHasNoUserError extends UserError {
  constructor() {
    super("Nenhum usuário foi encontrado para o projeto especificado.");
  }
}

export class UserAlreadyInProjectError extends UserError {
  constructor() {
    super("Usuário já está no projeto.");
  }
}

export class UserNotInProjectError extends UserError {
  constructor() {
    super("Usuário não está no projeto.");
  }
}

export class UserNotFoundError extends UserError {
  constructor() {
    super("Usuário não encontrado.");
  }
}

export class ProjectNotFoundError extends UserError {
  constructor() {
    super("Projeto não encontrado.");
  }
}

export const errorHandler = (error: Error, res: Response) => {
  if (error instanceof ProjectHasNoUserError) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  } else if (error instanceof UserAlreadyInProjectError) {
    res.status(StatusCodes.CONFLICT).json({ message: error.message });
  } else if (error instanceof UserNotInProjectError) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  } else if (error instanceof UserNotFoundError) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  } else if (error instanceof ProjectNotFoundError) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro interno do servidor." });
  }
};
