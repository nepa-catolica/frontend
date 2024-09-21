import { ITeacher } from "./ITeacher";
import { IUser } from "./IUser";

export interface IProject {
  id: number;
  nome: string;
  descricao: string,
  alunos_cadastrados: IUser[],
  professor: ITeacher,
}