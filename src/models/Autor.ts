export interface IAutor {
    id?: number;
    nome: string;
    nacionalidade: string;
}

export class Autor implements IAutor {
    public id?: number;
    public nome: string;
    public nacionalidade: string;

    constructor(nome: string, nacionalidade: string, id?: number){
        if (id !== undefined) {
        this.id = id;
        }
        this.nome = nome;
        this.nacionalidade = nacionalidade;
    }
}