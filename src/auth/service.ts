import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { UserRegisterDto } from "../user/dto";
import { DecodedToken, TokenResponse } from "./dto";
import {
  InvalidCredentialsError,
  InvalidTokenError,
  JWTSecretNotDefinedError,
} from "./errors";
import { AuthRepository } from "./repository";

export const AuthService = {
  registerUser: async (userDto: UserRegisterDto): Promise<TokenResponse> => {
    const { nome, email, senha, papel } = userDto;

    const newUser = await AuthRepository.createUser({
      nome,
      email,
      senha,
      papel,
    });

    if (!JWT_SECRET) {
      throw new JWTSecretNotDefinedError();
    }

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return { token };
  },

  loginUser: async (email: string, senha: string): Promise<TokenResponse> => {
    const user = await AuthRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    await AuthRepository.validatePassword(senha, user.senha);

    if (!JWT_SECRET) {
      throw new JWTSecretNotDefinedError();
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return { token };
  },

  getUserFromToken: (token: string): DecodedToken => {
    if (!JWT_SECRET) {
      throw new JWTSecretNotDefinedError();
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
      return decoded;
    } catch (error) {
      throw new InvalidTokenError();
    }
  },
};
