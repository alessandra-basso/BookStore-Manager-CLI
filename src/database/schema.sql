DROP TABLE IF EXISTS emprestimos CASCADE;
DROP TABLE IF EXISTS livros CASCADE;
DROP TABLE IF EXISTS clientes CASCADE;
DROP TABLE IF EXISTS autores CASCADE;

CREATE TABLE autores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    nacionalidade VARCHAR(100) NOT NULL
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefone VARCHAR(20) NOT NULL
);

CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    autor_id INT NOT NULL REFERENCES autores(id) ON DELETE CASCADE,
    ano_publicacao INT NOT NULL,
    quantidade_disponivel INT NOT NULL DEFAULT 1 CHECK (quantidade_disponivel >= 0)
);

CREATE TABLE emprestimos (
    id SERIAL PRIMARY KEY,
    livro_id INT NOT NULL REFERENCES livros(id) ON DELETE CASCADE,
    cliente_id INT NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
    data_emprestimo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_devolucao TIMESTAMP
);
