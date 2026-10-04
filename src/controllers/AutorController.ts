import readlineSync from 'readline-sync';
import { AutorService } from '../services/AutorService.js';

export class AutorController {
    private autorService: AutorService;

    constructor(){
        this.autorService = new AutorService();
    }

    async menu(): Promise<void> {
        let opcao = '';
        while (opcao !== '0'){
            console.log('\n--- GERENCIAMENTO DE AUTORES ---');
            console.log('1. Cadastrar Autor');
            console.log('2. Listar Autores');
            console.log('3. Consultar Autor por ID');
            console.log('4. Atualizar Autor');
            console.log('5. Remover Autor');
            console.log('0. Voltar ao Menu Principal');

            opcao = readlineSync.question('Escolha uma opção: ');

            try{
                switch(opcao) {
                    case '1':
                        await this.cadastrar();
                        break;
                    case '2':
                        await this.listar();
                        break;
                    case '3':
                        await this.consultar();
                        break;
                    case '4':
                        await this.atualizar();
                        break;
                    case '5':
                        await this.remover();
                        break;
                    case '0':
                        console.log('Voltando...');
                        break;
                    default:
                        console.log('Opção inválida! Tente novamente.');
                }
            } catch (error: any) {
                console.log(`\n ERRO: ${error.message}`);
            }
        }
    }

    private async cadastrar(): Promise<void> {
        const nome = readlineSync.question('Nome do autor: ');
        const nacionalidade = readlineSync.question('Nacionalidade: ');
        const autor = await this.autorService.cadastrarAutor(nome, nacionalidade);
        console.log(`\n Autor cadastrado com sucesso! ID: ${autor.id}`);
    }

    private async listar(): Promise<void> {
        const autores = await this.autorService.listarAutores();
        console.log('\n --- Lista de Autores ---');
        if(autores.length === 0) {
            console.log('Nenhum autor cadastrado.');
            return;
        }
        autores.forEach( a => {
            console.log(`[ID: ${a.id}] ${a.nome} - Nacionalidade: ${a.nacionalidade}`);
        });
    }

    private async consultar(): Promise<void> {
        const id = readlineSync.questionInt('ID do autor: ');
        const autor = await this.autorService.obterAutorPorId(id);
        console.log(`\n Autor Encontrado: [ID: ${autor.id}] ${autor.nome} | Nacionalidade: ${autor.nacionalidade}`);
    }

    private async atualizar(): Promise<void> {
        const id = readlineSync.questionInt('ID do autor a ser atualizado: ');
        const nome = readlineSync.question('Novo nome: ');
        const nacionalidade = readlineSync.question('Nova nacionalidade: ');
        await this.autorService.atualizarAutor(id, nome, nacionalidade)
    }

    private async remover(): Promise<void> {
        const id = readlineSync. questionInt('ID do autor a ser removido: ');
        await this.autorService.removerAutor(id);
        console.log('\n Autor removido com sucesso!');
        }
}