export interface INotice {
  id: number;
  nome: string;
  descricao: string;
  slug: string;
  data_criacao: Date;
  arquivo_pdf: string;
}