import readlineSync from 'readline-sync';
import { testConnection } from './database/connection.js';
import { AutorController } from './controllers/AutorController.js';
import { LivroController } from './controllers/LivroController.js';
import { ClienteController } from './controllers/ClienteController.js';
import { EmprestimoController } from './controllers/EmprestimoController.js';
import { RelatorioController } from './controllers/RelatorioController.js';
import { EmprestimoService } from './services/EmprestimoService.js';

async function main() {
    console.log('==================================================');
    console.log('      BEM-VINDO AO BOOKSTORE MANAGER CLI      ');
    console.log('==================================================');

    console.log('Verificando conexão com o banco de dados PostgreSQL...');
  const conexaoOk = await testConnection();

  if (!conexaoOk) {
    console.error('Não foi possível conectar ao banco de dados. Verifique o arquivo .env e o servidor PostgreSQL.');
    process.exit(1);
  }

  console.log('Conexão estabelecida com sucesso!\n');

  const autorController = new AutorController();
  const livroController = new LivroController();
  const clienteController = new ClienteController();
  
  const emprestimoService = new EmprestimoService();
  const emprestimoController = new EmprestimoController(emprestimoService);
  const relatorioController = new RelatorioController(emprestimoService);

  let opcao = '';

  while (opcao !== '0') {
    console.log('\n========== MENU PRINCIPAL ==========');
    console.log('1. Gerenciar Autores');
    console.log('2. Gerenciar Livros');
    console.log('3. Gerenciar Clientes');
    console.log('4. Gerenciar Empréstimos');
    console.log('5. Relatórios Gerenciais');
    console.log('0. Sair');
    console.log('====================================');

    opcao = readlineSync.question('Escolha um modulo: ');

    switch (opcao) {
        case '1':
        await autorController.menu();
        break;
      case '2':
        await livroController.menu();
        break;
      case '3':
        await clienteController.menu();
        break;
      case '4':
        await emprestimoController.menu();
        break;
      case '5':
        await relatorioController.menu();
        break;
      case '0':
        console.log('\nEncerrando a aplicação... Até logo!');
        process.exit(0);
      default:
        console.log('Opção inválida. Escolha um número entre 0 e 5.');
    }
  }
}

main().catch((err) => {
  console.error('Erro fatal na aplicação:', err);
});