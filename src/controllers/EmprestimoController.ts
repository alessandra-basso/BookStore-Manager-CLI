import readlineSync from 'readline-sync';
import { EmprestimoService } from '../services/EmprestimoService.js';

export class EmprestimoController {
  private emprestimoService: EmprestimoService;

  constructor(emprestimoService?: EmprestimoService) {
    this.emprestimoService = emprestimoService || new EmprestimoService();
  }

  async menu(): Promise<void> {
    let opcao = '';
    while (opcao !== '0') {
      console.log('\n--- GERENCIAMENTO DE EMPRÉSTIMOS ---');
      console.log('1. Realizar Empréstimo');

      opcao = readlineSync.question('Escolha uma opção: ');

      try {
        switch (opcao) {
          case '1': await this.realizarEmprestimo(); break;
          case '2': await this.devolver(); break;
          case '3': await this.listar(); break;
          case '0': console.log('Voltando...'); break;
          default: console.log('Opção inválida!');
        }
      } catch (error: any) {
        console.log(`\n ERRO: ${error.message}`);
      }
    }
  }

  private async realizarEmprestimo(): Promise<void> {
    const livroId = readlineSync.questionInt('ID do Livro: ');
    const clienteId = readlineSync.questionInt('ID do Cliente: ');
    const emp = await this.emprestimoService.realizarEmprestimo(livroId, clienteId);
    console.log(`\n Empréstimo registrado com sucesso! ID do Empréstimo: ${emp.id}`);
  }

  private async devolver(): Promise<void> {
    const empId = readlineSync.questionInt('ID do Empréstimo a devolver: ');
    await this.emprestimoService.devolverLivro(empId);
    console.log('\n Livro devolvido e estoque atualizado com sucesso!');
  }

  private async listar(): Promise<void> {
    const lista = await this.emprestimoService.listarEmprestimos();
    console.log(`\n--- Histórico de Empréstimos ---`);
    if (lista.length === 0){
        console.log('Nenhum empréstimo cadastrado.');
        return;
    }
    lista.forEach(e => {
        const status = e.data_devolucao ? `Devolvido em ${new Date(e.data_devolucao).toLocaleDateString('pt-BR')}` : 'ATIVO';
        console.log(`[ID: ${e.id}] Livro: ${e.livro_titulo} | Cliente: ${e.cliente_nome} | Data: ${new Date(e.data_emprestimo!).toLocaleDateString('pt-BR')} | Status: ${status}`);
    });
  }
}
