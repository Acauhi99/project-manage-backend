import { UserResponseDto } from "./dto";
import { UserRepository } from "./repository";

export const UserService = {
  listUsersInProject: async (
    projetoId: number,
    page: number,
    limit: number
  ): Promise<{ users: UserResponseDto[]; total: number }> => {
    return await UserRepository.findUsersByProjectId(projetoId, page, limit);
  },

  addUserToProject: async (projetoId: number, usuarioId: number) => {
    return await UserRepository.addUserToProject(projetoId, usuarioId);
  },

  removeUserFromProject: async (projetoId: number, usuarioId: number) => {
    await UserRepository.removeUserFromProject(projetoId, usuarioId);
  },
};
