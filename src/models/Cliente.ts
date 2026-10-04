export interface ICliente {
    id?: number;
    nome: string;
    email: string;
    telefone: string;
}

export class Cliente implements ICliente {
    public id?: number;
    public nome: string;
    public email: string;
    public telefone: string;

    constructor(nome: string, email: string, telefone: string, id?: number){
        if(id !== undefined){
            this.id = id;
        }
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }
}