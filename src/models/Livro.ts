export interface ILivro {
    id?: number;
    titulo: string;
    autor_id: number;
    ano_publicacao: number;
    quantidade_disponivel: number;
    autor_nome?: string;
}

export class Livro implements ILivro {
    public id?: number;
    public titulo: string;
    public autor_id: number;
    public ano_publicacao: number;
    public quantidade_disponivel: number;
    public autor_nome?: string;

    constructor(
        titulo: string,
        autor_id: number,
        ano_publicacao: number,
        quantidade_disponivel: number,
        id?: number,
        autor_nome?: string
    ) {
        if (id !== undefined){
            this.id = id;
        }
        this.titulo = titulo;
        this.autor_id = autor_id;
        this.ano_publicacao = ano_publicacao;
        this.quantidade_disponivel = quantidade_disponivel;
        if (autor_nome !== undefined){
            this.autor_nome = autor_nome;
        }
    }
}