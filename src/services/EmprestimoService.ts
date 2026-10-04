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
}