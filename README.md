# Bookstore Manager CLI

Aplicação executável via terminal (CLI) desenvolvida em **Node.js** e **TypeScript** 
para gerenciamento completo de uma livraria, com persistência em banco de dados relacional 
**PostgreSQL**.

## Objetivo do Projeto
Fornecer um sistema corporativo de pequeno porte para informatização do controle de autores, 
livros, clientes, empréstimos e relatórios gerenciais de uma livraria, aplicando conceitos 
de Arquitetura em Camadas, Orientação a Objetos e relatórios SQL com comandos relacionais.

## Tecnologias Utilizadas
* Node.js
* TypeScript
* PostgreSQL (Driver 'pg')
* Dotenv (Gerenciamento de variáveis de ambiente)
* Readline-sync (Interface interativa no terminal)
* TSX (Execução TypeScript em ambiente de desenvolvimento)
* Git & GitHub (Versionamento de código)

## Arquitetura do Sistema
A aplicação adota uma **Arquitetura em Camadas** bem definida para garantir legibilidade, fácil
manutenção e baixo acoplamento:
src/
├── controllers/    # Camada de apresentação (interação com o usuário via terminal)
├── services/       # Camada de regras de negócio e validações
├── repositories/   # Camada de dados (comunicação com o PostgreSQL utilizando SQL)
├── models/         # Definições de entidades, interfaces e classes
├── database/       # Conexão com banco e script SQL (schema.sql)
└── main.ts         # Ponto de entrada da aplicação

## Pré-requisitos
Antes de executar o projeto, você precisará ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (v18 ou superior)
* [PostgreSQL](https://www.postgresql.org/) (v12 ou superior)
* Git

## Intruções de Instalação e Execução

### 1. Clonar o Repositório
git clone [https://github.com/alessandra-basso/BookStore-Manager-CLI.git](https://github.com/alessandra-basso/BookStore-Manager-CLI.git)
cd bookstore-manager-cli

### 2. Instalar Dependências
npm install

### 3. Configurar o Banco de Dados
1. No seu PostgreSQL, crie o banco de dados bookstore_db:
`CREATE DATABASE bookstore_db`;

2. Execute o script de criação de tabelas localizado em src/database/schema.sql.

### 4. Configurar Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto com as suas credenciais locais do PostgreSQL:
`DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=suasenha
DB_NAME=bookstore_db`

### 5. Executar a Aplicação
1. Em ambiente de desenvolvimento
`npm run dev`

2. Compilar e executar em produção
`npm run build
npm start`

## Funcionalidades Implementadas
1. Gerenciamento de Autores: Cadastrar, listar, buscar por ID, atualizar e remover autores.
2. Gerenciamento de Livros: Cadastrar livros (vinculados a autores existentes), listar com JOIN, atualizar estoque e remover.
3. Gerenciamento de Clientes: Cadastrar clientes (com validação de e-mail único), listar, consultar e atualizar.
4. Controle de Empréstimos e Devoluções:
    * Valida existência do livro e do cliente.
    * Bloqueia empréstimo caso o estoque esteja zerado.
    * Atualiza automaticamente a quantidade disponível do livro ao emprestar e devolver.
5. Relatórios Gerenciais (SQL Avançado):
    * Livros disponíveis.
    * Livros atualmente emprestados.
    * Total de livros cadastrados por autor.
    * Histórico de empréstimos por livro.
    * Clientes com empréstimos ativos (HAVING / GROUP BY).

## Quadro Kanban
Link do quadro kanban: [https://github.com/users/alessandra-basso/projects/2](https://github.com/users/alessandra-basso/projects/2)