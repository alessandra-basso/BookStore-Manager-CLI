import { EmprestimoRepository } from '../repositories/EmprestimoRepository.js';
import { LivroRepository } from '../repositories/LivroRepository.js';
import { ClienteRepository } from '../repositories/ClienteRepository.js';
import { Emprestimo } from '../models/Emprestimo.js';

export class EmprestimoService {
  private emprestimoRepo: EmprestimoRepository;
  private livroRepo: LivroRepository;
  private clienteRepo: ClienteRepository;

  constructor() {
    this.emprestimoRepo = new EmprestimoRepository();
    this.livroRepo = new LivroRepository();
    this.clienteRepo = new ClienteRepository();
  }

  async realizarEmprestimo(livroId: number, clienteId: number): Promise<Emprestimo> {
    const livro = await this.livroRepo.buscarPorId(livroId);
    if (!livro) throw new Error(`Livro com ID ${livroId} não foi encontrado.`);

    const cliente = await this.clienteRepo.buscarPorId(clienteId);
    if (!cliente) throw new Error(`Cliente com ID ${clienteId} não foi encontrado.`);

    if (livro.quantidade_disponivel <= 0) {
      throw new Error(`O livro "${livro.titulo}" não está disponível no momento (estoque zerado).`);
    }

    await this.livroRepo.atualizarQuantidade(livro.id!, livro.quantidade_disponivel - 1);

    return await this.emprestimoRepo.criar(livroId, clienteId);
  }

  async devolverLivro(emprestimoId: number): Promise<Emprestimo> {
    const emprestimo = await this.emprestimoRepo.buscarPorId(emprestimoId);
    if (!emprestimo) throw new Error(`Empréstimo com ID ${emprestimoId} não encontrado.`);

    if (emprestimo.data_devolucao) {
      throw new Error('Este empréstimo já foi devolvido anteriormente.');
    }

    const devolvido = await this.emprestimoRepo.registrarDevolucao(emprestimoId);
    if (!devolvido) throw new Error('Erro ao registrar a devolução.');

    const livro = await this.livroRepo.buscarPorId(emprestimo.livro_id);
    if (livro) {
      await this.livroRepo.atualizarQuantidade(livro.id!, livro.quantidade_disponivel + 1);
    }

    return devolvido;
  }

  async listarEmprestimos(): Promise<Emprestimo[]> {
    return await this.emprestimoRepo.listarTodos();
  }
}