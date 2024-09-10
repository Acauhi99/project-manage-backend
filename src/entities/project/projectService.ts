import {
  ProjectDto,
  ProjectListResponseDto,
  ProjectResponseDto,
} from "./projectDto";
import { ProjectRepository } from "./projectRepository";

export const ProjectService = {
  listProjects: async (
    page: number,
    limit: number
  ): Promise<{ projects: ProjectListResponseDto; total: number }> => {
    const { projects, total } = await ProjectRepository.findAll(page, limit);
    return { projects: { projects }, total };
  },

  createProject: async (data: ProjectDto): Promise<ProjectResponseDto> => {
    return await ProjectRepository.create(data);
  },

  updateProject: async (
    id: number,
    data: ProjectDto
  ): Promise<ProjectResponseDto> => {
    return await ProjectRepository.update(id, data);
  },

  deleteProject: async (id: number): Promise<void> => {
    await ProjectRepository.delete(id);
  },
};
