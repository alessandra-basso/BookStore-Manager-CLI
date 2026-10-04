import { ClienteRepository } from "../repositories/ClienteRepository.js";
import { Cliente } from "../models/Cliente.js";

export class ClienteService {
  private clienteRepo: ClienteRepository;

  constructor() {
    this.clienteRepo = new ClienteRepository();
  }

  async cadastrarCliente(nome: string, email: string, telefone: string): Promise<Cliente> {
    if (!nome.trim() || !email.trim() || !telefone.trim()) {
      throw new Error('Todos os campos do cliente são obrigatórios!');
    }
    const emailExistente = await this.clienteRepo.buscarPorEmail(email.trim());
    if (emailExistente) {
      throw new Error(`O e-mail '${email}' já está cadastrado para outro cliente!`);
    }
    const cliente = new Cliente(nome.trim(), email.trim(), telefone.trim());
    return await this.clienteRepo.criar(cliente);
  }

  async listarClientes(): Promise<Cliente[]> {
    return await this.clienteRepo.listarTodos();
  }

  async obterClientePorId(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepo.buscarPorId(id);
    if (!cliente) throw new Error(`Cliente com ID ${id} não encontrado.`);
    return cliente;
  }

  async atualizarCliente(id: number, nome: string, email: string, telefone: string): Promise<Cliente> {
    await this.obterClientePorId(id);
    const clienteComMesmoEmail = await this.clienteRepo.buscarPorEmail(email.trim());
    if (clienteComMesmoEmail && clienteComMesmoEmail.id !== id) {
      throw new Error('E-mail já está em uso por outro cliente.');
    }
    const cliente = new Cliente(nome.trim(), email.trim(), telefone.trim(), id);
    const atualizado = await this.clienteRepo.atualizar(cliente);
    if (!atualizado) throw new Error('Erro ao atualizar cliente.');
    return atualizado;
  }

  async removerCliente(id: number): Promise<void> {
    await this.obterClientePorId(id);
    await this.clienteRepo.remover(id);
  }
}