import { LivroRepository } from '../repositories/LivroRepository.js';
import { AutorRepository } from '../repositories/AutorRepository.js';
import { Livro } from '../models/Livro.js';

export class LivroService {
    private livroRepo: LivroRepository;
    private autorRepo: AutorRepository;

    constructor(){
        this.livroRepo = new LivroRepository();
        this.autorRepo = new AutorRepository();
    }

    async cadastrarLivro(titulo: string, autor_id: number, ano_publicacao: number, quantidade_disponivel: number): Promise<Livro>{
        if(!titulo.trim()) throw new Error('Título é obrigatório!');
        if(quantidade_disponivel < 0) throw new Error('Quantidade não pode ser negativa!');

        const autor = await this.autorRepo.buscarPorId(autor_id);
        if(!autor) throw new Error(`Autor com ID ${autor_id} não existe. Cadastre o autor primeiro!`);

        const livro = new Livro(titulo.trim(), autor_id, ano_publicacao, quantidade_disponivel);
        return await this.livroRepo.criar(livro);
    }

    async listarLivros(): Promise<Livro[]> {
    return await this.livroRepo.listarTodos();
  }

  async obterLivroPorId(id: number): Promise<Livro> {
    const livro = await this.livroRepo.buscarPorId(id);
    if (!livro) throw new Error(`Livro com ID ${id} não encontrado.`);
    return livro;
  }

  async atualizarLivro(id: number, titulo: string, autor_id: number, ano_publicacao: number, quantidade_disponivel: number): Promise<Livro> {
    await this.obterLivroPorId(id);
    const autor = await this.autorRepo.buscarPorId(autor_id);
    if (!autor) throw new Error(`Autor com ID ${autor_id} não encontrado.`);

    const livro = new Livro(titulo.trim(), autor_id, ano_publicacao, quantidade_disponivel, id);
    const atualizado = await this.livroRepo.atualizar(livro);
    if (!atualizado) throw new Error('Erro ao atualizar livro.');
    return atualizado;
  }

  async removerLivro(id: number): Promise<void> {
    await this.obterLivroPorId(id);
    await this.livroRepo.remover(id)
  }
}