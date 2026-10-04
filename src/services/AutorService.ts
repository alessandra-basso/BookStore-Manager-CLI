import { AutorRepository } from "../repositories/AutorRepository.js";
import { Autor } from '../models/Autor.js';

export class AutorService {
    private autorRepo: AutorRepository;

    constructor(){
        this.autorRepo = new AutorRepository();
    }

    async cadastrarAutor(nome: string, nacionalidade: string): Promise<Autor> {
        if (!nome.trim() || !nacionalidade.trim()){
            throw new Error('Nome e nacionalidade são obrigatórios!');
        }
        const autor = new Autor(nome.trim(), nacionalidade.trim());
        return await this.autorRepo.criar(autor);
    }

    async listarAutores(): Promise<Autor[]>{
        return await this.autorRepo.listarTodos();
    }

    async obterAutorPorId(id: number): Promise<Autor> {
        const autor = await this.autorRepo.buscarPorId(id);
        if (!autor) {
            throw new Error(`Autor com ID ${id} não foi encontrado.`);
        }
        return autor;
    }

    async atualizarAutor(id: number, nome: string, nacionalidade: string): Promise<Autor> {
        await this.obterAutorPorId(id);
        if (!nome.trim() || !nacionalidade.trim()) {
            throw new Error('Nome e nacionalidade não podem ser vazios!');
        }
        const autor = new Autor(nome.trim(), nacionalidade.trim(), id);
        const atualizado = await this.autorRepo.atualizar(autor);
        if (!atualizado) throw new Error('Erro ao atualizar autor.');
        return atualizado;
    }

    async removerAutor(id: number): Promise<void> {
        await this.obterAutorPorId(id);
        await this.autorRepo.remover(id);
    }
}