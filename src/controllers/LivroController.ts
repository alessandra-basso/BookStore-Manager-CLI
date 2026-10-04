import readlineSync from 'readline-sync';
import { LivroService } from '../services/LivroService.js';

export class LivroController {
  private livroService: LivroService;

  constructor() {
    this.livroService = new LivroService();
  }

  async menu(): Promise<void> {
    let opcao = '';
    while (opcao !== '0') {
      console.log('\n--- GERENCIAMENTO DE LIVROS ---');
      console.log('1. Cadastrar Livro');
      console.log('2. Listar Livros');
      console.log('3. Consultar Livro por ID');
      console.log('4. Atualizar Livro');
      console.log('5. Remover Livro');
      console.log('0. Voltar ao Menu Principal');

      opcao = readlineSync.question('Escolha uma opcao: ');

        try {
            switch (opcao) {
                case '1': await this.cadastrar(); break;
                case '2': await this.listar(); break;
                case '3': await this.consultar(); break;
                case '4': await this.atualizar(); break;
                case '5': await this.remover(); break;
                case '0': console.log('Voltando...'); break;
                default: console.log('Opção inválida!');
            }
        } catch (error: any){
            console.log(`\n ERRO: ${error.message}`);
            }
    }
}

    private async cadastrar(): Promise<void> {
        const titulo = readlineSync.question('Título do Livro: ');
        const autor_id = readlineSync.questionInt('ID do Autor: ');
        const ano_publicacao = readlineSync.questionInt('Ano de Publicação: ');
        const quantidade = readlineSync.questionInt('Quantidade em Estoque: ');

        const livro = await this.livroService.cadastrarLivro(titulo, autor_id, ano_publicacao, quantidade);
        console.log(`\n Livro cadastrado com sucesso! ID: ${livro.id}`);
    }

    private async listar(): Promise<void> {
        const livros = await this.livroService.listarLivros();
        console.log('\n--- Lista de Livros ---');
        if (livros.length === 0) {
        console.log('Nenhum livro cadastrado.');
        return;
        }
        livros.forEach(l => {
        console.log(`[ID: ${l.id}] ${l.titulo} | Autor: ${l.autor_nome} (ID: ${l.autor_id}) | Ano: ${l.ano_publicacao} | Est: ${l.quantidade_disponivel}`);
        });
    }

    private async consultar(): Promise<void> {
        const id = readlineSync.questionInt('ID do Livro: ');
        const l = await this.livroService.obterLivroPorId(id);
        console.log(`\n [ID: ${l.id}] ${l.titulo} | Autor: ${l.autor_nome} | Ano: ${l.ano_publicacao} | Estoque: ${l.quantidade_disponivel}`);
    }

    private async atualizar(): Promise<void> {
        const id = readlineSync.questionInt('ID do Livro a ser atualizado: ');
        const titulo = readlineSync.question('Novo Título: ');
        const autor_id = readlineSync.questionInt('Novo ID do Autor: ');
        const ano = readlineSync.questionInt('Novo Ano: ');
        const qtd = readlineSync.questionInt('Nova Quantidade: ');

        await this.livroService.atualizarLivro(id, titulo, autor_id, ano, qtd);
        console.log('\n Livro atualizado com sucesso!');
    }

    private async remover(): Promise<void> {
        const id = readlineSync.questionInt('ID do Livro a ser removido: ');
        await this.livroService.removerLivro(id);
        console.log('\n Livro removido com sucesso!');
    }
}