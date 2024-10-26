import { ITeacher } from "./ITeacher";
import { IUser } from "./IUser";

export interface IProject {
  id: number;
  titulo: string;
  descricao: string,
  vagas: number;
  titulacao: string,
  curso: string,
  linhaDePesquisa: string,
  situacao: string,
  palavrasChave: string,
  localizacao: string,
  populacao: string,
  justificativa: string,
  objetivoGeral: string,
  objetivoEspecifico: string,
  metodologia: string,
  cronogramaDeAtividade: string,
  referencias: string,
  termos: boolean,
  data_criacao: Date,
  data_limite_edicao: Date,
  aprovado: boolean,
  professor: ITeacher,
}