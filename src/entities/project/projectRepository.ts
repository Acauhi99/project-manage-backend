import { PrismaClient } from "@prisma/client";
import { formatProject, ProjectDto, ProjectResponseDto } from "./projectDto";
import {
  ProjectHasUsersError,
  ProjectNameExistsError,
  ProjectNotCompletedError,
  ProjectNotFoundError,
} from "./projectErrors";

const prisma = new PrismaClient();

export const ProjectRepository = {
  findAll: async (
    page: number,
    limit: number
  ): Promise<{ projects: ProjectResponseDto[]; total: number }> => {
    const skip = (page - 1) * limit;
    const [projects, total] = await prisma.$transaction([
      prisma.projeto.findMany({
        skip,
        take: limit,
      }),
      prisma.projeto.count(),
    ]);

    if (projects.length === 0) {
      throw new ProjectNotFoundError();
    }

    return { projects: projects.map(formatProject), total };
  },

  findByName: async (nome: string): Promise<ProjectResponseDto | null> => {
    const project = await prisma.projeto.findFirst({
      where: { nome },
    });
    if (!project) {
      throw new ProjectNotFoundError();
    }
    return formatProject(project);
  },

  create: async (data: ProjectDto): Promise<ProjectResponseDto> => {
    const existingProject = await prisma.projeto.findFirst({
      where: { nome: data.nome },
    });

    if (existingProject) {
      throw new ProjectNameExistsError();
    }

    const project = await prisma.projeto.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        data_inicio: new Date(data.data_inicio),
        data_fim: data.data_fim ? new Date(data.data_fim) : null,
        status: data.status,
      },
    });
    return formatProject(project);
  },

  update: async (id: number, data: ProjectDto): Promise<ProjectResponseDto> => {
    const project = await prisma.projeto.findUnique({
      where: { id },
    });

    if (!project) {
      throw new ProjectNotFoundError();
    }

    const updatedProject = await prisma.projeto.update({
      where: { id },
      data: {
        nome: data.nome,
        descricao: data.descricao,
        data_inicio: new Date(data.data_inicio),
        data_fim: data.data_fim ? new Date(data.data_fim) : null,
        status: data.status,
      },
    });
    return formatProject(updatedProject);
  },

  delete: async (id: number): Promise<void> => {
    const project = await prisma.projeto.findUnique({
      where: { id },
    });

    if (!project) {
      throw new ProjectNotFoundError();
    }

    if (project.status !== "Concluído") {
      throw new ProjectNotCompletedError();
    }

    const users = await prisma.projetoUsuario.findMany({
      where: { projeto_id: id },
    });

    if (users.length > 0) {
      throw new ProjectHasUsersError();
    }

    await prisma.projeto.delete({
      where: { id },
    });
  },
};
