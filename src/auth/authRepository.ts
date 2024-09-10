import { PrismaClient, Usuario } from "@prisma/client";
import bcrypt from "bcryptjs";
import { InvalidCredentialsError, UserAlreadyExistsError } from "./authErrors";

const prisma = new PrismaClient();

export const AuthRepository = {
  findByEmail: async (email: string): Promise<Usuario | null> => {
    return prisma.usuario.findUnique({ where: { email } });
  },

  createUser: async (data: {
    nome: string;
    email: string;
    senha: string;
    papel: string;
  }): Promise<Usuario> => {
    const existingUser = await prisma.usuario.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await bcrypt.hash(data.senha, 10);
    return prisma.usuario.create({
      data: {
        ...data,
        senha: hashedPassword,
      },
    });
  },

  validatePassword: async (
    plainPassword: string,
    hashedPassword: string
  ): Promise<void> => {
    const isPasswordValid = await bcrypt.compare(plainPassword, hashedPassword);
    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }
  },
};
