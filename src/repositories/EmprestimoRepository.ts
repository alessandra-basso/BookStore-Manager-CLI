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
}  