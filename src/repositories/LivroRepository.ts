import { pool } from '../database/connection.js';
import { Livro } from '../models/Livro.js';

export class LivroRepository {
    async criar(livro: Livro): Promise<Livro> {
        const query = `
        INSERT INTO livros (titulo, autor_id, ano_publicacao, quantidade_disponivel)
        VALUES ($1, $2, $3, $4) RETURNING id, titulo, autor_id, ano_publicacao, quantidade_disponivel;
        `;
        const values = [livro.titulo, livro.autor_id, livro.ano_publicacao, livro.quantidade_disponivel];
        const result = await pool.query(query, values);
        const row =  result.rows[0];
        return new Livro(row.titulo, row.autor_id, row.ano_publicacao, row.quantidade_disponivel, row.id);
    }

    async listarTodos(): Promise<Livro[]> {
        const query = `
        SELECT l.id, l.titulo, l.autor_id, l.ano_publicacao, l.quantidade_disponivel, a.nome as autor_nome
        FROM livros l 
        INNER JOIN autores a ON l.autor_id = a.id
        ORDER BY l.id ASC;
        `;
        const result = await pool.query(query);
        return result.rows.map(
            row => new Livro(row.titulo, row.autor_id, row.ano_publicacao, row.quantidade_disponivel, row.id, row.autor_nome)
        );
    }

    async buscarPorId(id: number): Promise<Livro | null> {
        const query = `
        SELECT l.id, l.titulo, l.autor_id, l.ano_publicacao, l.quantidade_disponivel, a.nome as autor_nome
        FROM livros l
        INNER JOIN autores a ON l.autor_id = a.id
        WHERE l.id = $1;
        `;
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) return null;
        const row = result.rows[0];
        return new Livro(row.titulo, row.autor_id, row.ano_publicacao, row.quantidade_disponivel, row.id, row.autor_nome);
    }

    async atualizar(livro: Livro): Promise<Livro | null> {
    const query = `
      UPDATE livros
      SET titulo = $1, autor_id = $2, ano_publicacao = $3, quantidade_disponivel = $4
      WHERE id = $5
      RETURNING id, titulo, autor_id, ano_publicacao, quantidade_disponivel;
    `;
    const values = [livro.titulo, livro.autor_id, livro.ano_publicacao, livro.quantidade_disponivel, livro.id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new Livro(row.titulo, row.autor_id, row.ano_publicacao, row.quantidade_disponivel, row.id);
  }

  async atualizarQuantidade(id: number, quantidade: number): Promise<void> {
    const query = 'UPDATE livros SET quantidade_disponivel = $1 WHERE id = $2;';
    await pool.query(query, [quantidade, id]);
  }

  async remover(id: number): Promise<boolean> {
    const query = `DELETE FROM livros WHERE id = $1;`;
    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }
}
