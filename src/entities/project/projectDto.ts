import { Projeto } from "@prisma/client";
import { format } from "date-fns";

export interface ProjectDto {
  nome: string;
  descricao: string;
  data_inicio: string;
  data_fim?: string | null;
  status: string;
}

export interface ProjectResponseDto {
  id: number;
  nome: string;
  descricao: string;
  data_inicio: string;
  data_fim?: string | null;
  status: string;
}

export interface ProjectListResponseDto {
  projects: ProjectResponseDto[];
}

export const formatProject = (project: Projeto): ProjectResponseDto => ({
  id: project.id,
  nome: project.nome,
  descricao: project.descricao,
  data_inicio: format(new Date(project.data_inicio), "yyyy-MM-dd"),
  data_fim: project.data_fim
    ? format(new Date(project.data_fim), "yyyy-MM-dd")
    : null,
  status: project.status,
});
