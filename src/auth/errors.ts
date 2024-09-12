import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export class UserAlreadyExistsError extends AuthError {
  constructor() {
    super("Usuário já existente");
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor() {
    super("Credenciais inválidas");
  }
}

export class JWTSecretNotDefinedError extends AuthError {
  constructor() {
    super("JWT_SECRET não está definida");
  }
}

export class InvalidTokenError extends AuthError {
  constructor() {
    super("Token inválido");
  }
}

export const errorHandler = (error: Error, res: Response) => {
  if (error instanceof UserAlreadyExistsError) {
    res.status(StatusCodes.CONFLICT).json({ message: error.message });
  } else if (error instanceof InvalidCredentialsError) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message });
  } else if (error instanceof JWTSecretNotDefinedError) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  } else if (error instanceof InvalidTokenError) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message });
  } else {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Erro ao processar a solicitação" });
  }
};
