import { pool } from '../database/connection.js';
import { Emprestimo } from '../models/Emprestimo.js';

export class EmprestimoRepository {
  async criar(livroId: number, clienteId: number): Promise<Emprestimo> {
    const query = `
      INSERT INTO emprestimos (livro_id, cliente_id, data_emprestimo)
      VALUES ($1, $2, NOW()) RETURNING id, livro_id, cliente_id, data_emprestimo, data_devolucao;
    `;
    const result = await pool.query(query, [livroId, clienteId]);
    const row = result.rows[0];
    return new Emprestimo(row.livro_id, row.cliente_id, row.id, row.data_emprestimo, row.data_devolucao);
  }

  async registrarDevolucao(emprestimoId: number): Promise<Emprestimo | null> {
    const query = `
      UPDATE emprestimos SET data_devolucao = NOW()
      WHERE id = $1 AND data_devolucao IS NULL
      RETURNING id, livro_id, cliente_id, data_emprestimo, data_devolucao;
    `;
    const result = await pool.query(query, [emprestimoId]);
    if (result.rows.length === 0) return null;
    const r = result.rows[0];
    return new Emprestimo(r.livro_id, r.cliente_id, r.id, r.data_emprestimo, r.data_devolucao);
  }

  async buscarPorId(id: number): Promise<Emprestimo | null> {
    const query = `
      SELECT e.id, e.livro_id, e.cliente_id, e.data_emprestimo, e.data_devolucao,
             l.titulo as livro_titulo, c.nome as cliente_nome
      FROM emprestimos e
      INNER JOIN livros l ON e.livro_id = l.id
      INNER JOIN clientes c ON e.cliente_id = c.id
      WHERE e.id = $1;
    `;
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) return null;
    const r = result.rows[0];
    return new Emprestimo(r.livro_id, r.cliente_id, r.id, r.data_emprestimo, r.data_devolucao, r.livro_titulo, r.cliente_nome);
  }
}  