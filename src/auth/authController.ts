import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserRegisterDto } from "../entities/user/userDto";
import { errorHandler } from "./authErrors";
import { AuthService } from "./authService";

export const AuthController = {
  registerUser: async (req: Request, res: Response) => {
    const { nome, email, senha, papel } = req.body;
    const userDto = new UserRegisterDto(nome, email, senha, papel);

    try {
      const user = await AuthService.registerUser(userDto);
      res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      errorHandler(error as Error, res);
    }
  },

  loginUser: async (req: Request, res: Response) => {
    const { email, senha } = req.body;

    try {
      const token = await AuthService.loginUser(email, senha);
      res.status(StatusCodes.OK).json(token);
    } catch (error) {
      errorHandler(error as Error, res);
    }
  },

  decodeUser: (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Token não fornecido" });
    }

    try {
      const decoded = AuthService.getUserFromToken(token);
      res.status(StatusCodes.OK).json(decoded);
    } catch (error) {
      errorHandler(error as Error, res);
    }
  },
};
