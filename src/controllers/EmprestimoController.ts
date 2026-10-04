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
      console.log('\n--- 🔄 GERENCIAMENTO DE EMPRÉSTIMOS ---');
      console.log('1. Realizar Empréstimo');

      opcao = readlineSync.question('Escolha uma opção: ');

      try {
        switch (opcao) {
          case '1': await this.realizarEmprestimo(); break;
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
}
