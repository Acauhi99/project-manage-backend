import { PrismaClient, Usuario } from "@prisma/client";

const prisma = new PrismaClient();

export const User = {
  findOne: async (where: { email: string }) => {
    return prisma.usuario.findUnique({ where });
  },
  create: async (data: {
    nome: string;
    email: string;
    senha: string;
    papel: string;
  }) => {
    return prisma.usuario.create({ data });
  },
  toJSON: (user: Usuario) => {
    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
};
