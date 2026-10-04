import readlineSync from "readline-sync";
import { ClienteService } from "../services/ClienteService.js";

export class ClienteController {
    private clienteService: ClienteService;

    constructor(){
        this.clienteService = new ClienteService;
    }

    async menu(): Promise<void> {
        let opcao = '';
        while (opcao !== '0') {
            console.log('\n--- GERENCIAMENTO DE CLIENTES ---');
            console.log('1. Cadastrar Cliente');
            console.log('2. Listar Clientes');
            console.log('3. Consultar Cliente por ID');
            console.log('4. Atualizar Cliente');
            console.log('5. Remover Cliente');
            console.log('0. Voltar ao Menu Principal');

            opcao = readlineSync.question('Escolha uma opção: ');

            try{
                switch (opcao) {
                    case '1': await this.cadastrar(); break;
                    case '2': await this.listar(); break;
                    case '3': await this.consultar(); break;
                    case '4': await this.atualizar(); break;
                    case '5': await this.remover(); break;
                    case '0': console.log('Voltando...'); break;
                    default: console.log('Opção inválida!');
                } 
            }catch (error: any) {
                    console.log(`\n ERRO: ${error.message}`);
                }
        }
    }

  private async cadastrar(): Promise<void> {
    const nome = readlineSync.question('Nome do Cliente: ');
    const email = readlineSync.question('E-mail: ');
    const telefone = readlineSync.question('Telefone: ');
    const c = await this.clienteService.cadastrarCliente(nome, email, telefone);
    console.log(`\n Cliente cadastrado com sucesso! ID: ${c.id}`);
  }

  private async listar(): Promise<void> {
    const clientes = await this.clienteService.listarClientes();
    console.log('\n--- Lista de Clientes ---');
    if (clientes.length === 0) {
      console.log('Nenhum cliente cadastrado.');
      return;
    }
    clientes.forEach(c => {
      console.log(`[ID: ${c.id}] ${c.nome} | E-mail: ${c.email} | Tel: ${c.telefone}`);
    });
  }

  private async consultar(): Promise<void> {
    const id = readlineSync.questionInt('ID do cliente: ');
    const c = await this.clienteService.obterClientePorId(id);
    console.log(`\n [ID: ${c.id}] ${c.nome} | Email: ${c.email} | Tel: ${c.telefone}`);
  }

  private async atualizar(): Promise<void> {
    const id = readlineSync.questionInt('ID do Cliente a ser atualizado: ');
    const nome = readlineSync.question('Novo Nome: ');
    const email = readlineSync.question('Novo E-mail: ');
    const telefone = readlineSync.question('Novo Telefone: ');
    await this.clienteService.atualizarCliente(id, nome, email, telefone);
    console.log('\n Cliente atualizado com sucesso!');
  }

  private async remover(): Promise<void> {
    const id = readlineSync.questionInt('ID do Cliente a ser removido: ');
    await this.clienteService.removerCliente(id);
    console.log('\n Cliente removido com sucesso!');
  }
}