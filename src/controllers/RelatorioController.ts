import readlineSync from 'readline-sync';
import { EmprestimoService } from '../services/EmprestimoService.js';

export class RelatorioController {
  private emprestimoService: EmprestimoService;

  constructor(emprestimoService?: EmprestimoService) {
    this.emprestimoService = emprestimoService || new EmprestimoService();
  }

  async menu(): Promise<void> {
    let opcao = '';
    while (opcao !== '0') {
      console.log('\n--- RELATÓRIOS GERENCIAIS ---');
      console.log('1. Livros Disponíveis');
      console.log('2. Livros Emprestados (Ativos)');
      console.log('3. Livros Cadastrados por Autor');
      console.log('4. Quantidade de Empréstimos por Livro');
      console.log('5. Clientes com Empréstimos Ativos');
      console.log('0. Voltar ao Menu Principal');

      opcao = readlineSync.question('Escolha uma opção: ');

      try {
        switch (opcao) {
          case '1': await this.livrosDisponiveis(); break;
          case '2': await this.livrosEmprestados(); break;
          case '3': await this.livrosPorAutor(); break;
          case '4': await this.qtdEmprestimosPorLivro(); break;
          case '5': await this.clientesComEmprestimosAtivos(); break;
          case '0': console.log('Voltando...'); break;
          default: console.log('Opção inválida!');
        }   
      } catch (error: any) {
        console.log(`\n ERRO: ${error.message}`);
      }
    }
  }

  private async livrosDisponiveis(): Promise<void> {
    const dados = await this.emprestimoService.relatorioDisponiveis();
    console.log('\n--- Livros Disponíveis para Empréstimo ---');
    console.table(dados);
  }

  private async livrosEmprestados(): Promise<void> {
    const dados = await this.emprestimoService.relatorioEmprestados();
    console.log('\n--- Livros Atualmente Emprestados ---');
    console.table(dados);
  }

  private async livrosPorAutor(): Promise<void> {
    const dados = await this.emprestimoService.relatorioPorAutor();
    console.log('\n--- Quantidade de Livros por Autor ---');
    console.table(dados);
  }

  private async qtdEmprestimosPorLivro(): Promise<void> {
    const dados = await this.emprestimoService.relatorioQtdPorLivro();
    console.log('\n--- Empréstimos Realizados por Livro ---');
    console.table(dados);
  }

  private async clientesComEmprestimosAtivos(): Promise<void> {
    const dados = await this.emprestimoService.relatorioClientesAtivos();
    console.log('\n--- 👥 Clientes com Empréstimos Pendentes ---');
    console.table(dados);
  }
}