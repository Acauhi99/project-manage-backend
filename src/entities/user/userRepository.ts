import { PrismaClient } from "@prisma/client";
import { UserResponseDto } from "./userDto";
import {
  ProjectHasNoUserError,
  ProjectNotFoundError,
  UserAlreadyInProjectError,
  UserNotFoundError,
  UserNotInProjectError,
} from "./userErrors";

const prisma = new PrismaClient();

export const UserRepository = {
  findUsersByProjectId: async (
    projetoId: number,
    page: number,
    limit: number
  ): Promise<{ users: UserResponseDto[]; total: number }> => {
    const project = await prisma.projeto.findUnique({
      where: { id: projetoId },
    });

    if (!project) {
      throw new ProjectNotFoundError();
    }

    const skip = (page - 1) * limit;

    const [users, total] = await prisma.$transaction([
      prisma.usuario.findMany({
        where: {
          projetos: {
            some: {
              projeto_id: projetoId,
            },
          },
        },
        select: {
          id: true,
          nome: true,
          email: true,
          papel: true,
        },
        skip,
        take: limit,
      }),
      prisma.usuario.count({
        where: {
          projetos: {
            some: {
              projeto_id: projetoId,
            },
          },
        },
      }),
    ]);

    if (users.length === 0) {
      throw new ProjectHasNoUserError();
    }

    return {
      users: users.map(
        (user) =>
          new UserResponseDto(user.id, user.nome, user.email, user.papel)
      ),
      total,
    };
  },

  addUserToProject: async (projetoId: number, usuarioId: number) => {
    const project = await prisma.projeto.findUnique({
      where: { id: projetoId },
    });

    if (!project) {
      throw new ProjectNotFoundError();
    }

    const user = await prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    const userInProject = await prisma.projetoUsuario.findFirst({
      where: {
        projeto_id: projetoId,
        usuario_id: usuarioId,
      },
    });

    if (userInProject) {
      throw new UserAlreadyInProjectError();
    }

    try {
      const updatedUser = await prisma.projetoUsuario.create({
        data: {
          projeto_id: projetoId,
          usuario_id: usuarioId,
        },
      });
      return updatedUser;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Erro ao adicionar usuário ao projeto: ${err.message}`);
    }
  },

  removeUserFromProject: async (projetoId: number, usuarioId: number) => {
    const project = await prisma.projeto.findUnique({
      where: { id: projetoId },
    });

    if (!project) {
      throw new ProjectNotFoundError();
    }

    const user = await prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    const userInProject = await prisma.projetoUsuario.findFirst({
      where: {
        projeto_id: projetoId,
        usuario_id: usuarioId,
      },
    });

    if (!userInProject) {
      throw new UserNotInProjectError();
    }

    await prisma.projetoUsuario.delete({
      where: {
        projeto_id_usuario_id: {
          projeto_id: projetoId,
          usuario_id: usuarioId,
        },
      },
    });
  },
};
