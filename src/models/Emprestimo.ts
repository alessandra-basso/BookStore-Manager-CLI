export interface IEmprestimo {
    id?: number;
    livro_id: number;
    cliente_id: number;
    data_emprestimo?: Date;
    data_devolucao?: Date | null;
    livro_titulo?: string;
    cliente_nome?: string;
}

export class Emprestimo implements IEmprestimo {
    public id?: number;
    public livro_id: number;
    public cliente_id: number;
    public data_emprestimo?: Date;
    public data_devolucao?: Date | null;
    public livro_titulo?: string;
    public cliente_nome?: string;

    constructor(
        livro_id: number, 
        cliente_id: number, 
        data_emprestimo?: Date, 
        data_devolucao?: Date | null,
        id?: number,
        livro_titulo?: string,
        cliente_nome?: string
    )
    {
        if(id !== undefined){
            this.id = id;
        }
        this.livro_id = livro_id;
        this.cliente_id = cliente_id;
        if (data_emprestimo !== undefined){
            this.data_emprestimo = data_emprestimo;
        }
        if (data_devolucao !== undefined){
            this.data_devolucao = data_devolucao;
        }
        if (livro_titulo !== undefined){
            this.livro_titulo = livro_titulo;
        }
        if (cliente_nome !== undefined){
            this.cliente_nome = cliente_nome;
        }
    }
}