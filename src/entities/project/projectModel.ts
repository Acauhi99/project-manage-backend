import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const Project = {
  findAll: async () => {
    return prisma.projeto.findMany();
  },
  findOne: async (id: number) => {
    return prisma.projeto.findUnique({ where: { id } });
  },
  create: async (data: {
    nome: string;
    descricao: string;
    data_inicio: Date;
    data_fim?: Date;
    status: string;
  }) => {
    return prisma.projeto.create({ data });
  },
  update: async (
    id: number,
    data: {
      nome?: string;
      descricao?: string;
      data_inicio?: Date;
      data_fim?: Date;
      status?: string;
    }
  ) => {
    return prisma.projeto.update({
      where: { id },
      data,
    });
  },
  delete: async (id: number) => {
    return prisma.projeto.delete({ where: { id } });
  },
  listUsers: async (projetoId: number) => {
    return prisma.projetoUsuario.findMany({
      where: { projeto_id: projetoId },
      include: { usuario: true },
    });
  },
  addUser: async (projetoId: number, usuarioId: number) => {
    return prisma.projetoUsuario.create({
      data: {
        projeto_id: projetoId,
        usuario_id: usuarioId,
      },
    });
  },
  removeUser: async (projetoId: number, usuarioId: number) => {
    return prisma.projetoUsuario.delete({
      where: {
        projeto_id_usuario_id: {
          projeto_id: projetoId,
          usuario_id: usuarioId,
        },
      },
    });
  },
};
