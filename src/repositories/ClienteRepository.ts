import { pool } from '../database/connection.js';
import { Cliente } from '../models/Cliente.js';

export class ClienteRepository {
    async criar(cliente: Cliente): Promise<Cliente>{
        const query = `
        INSERT INTO clientes (nome, email, telefone)
        VALUES ($1, $2, $3) RETURNING id, nome, email, telefone;
        `;
        const result = await pool.query(query, [cliente.nome, cliente.email, cliente.telefone]);
        const row = result.rows[0];
        return new Cliente(row.nome, row.email, row.telefone, row.id);
    }

  async listarTodos(): Promise<Cliente[]> {
    const query = 'SELECT id, nome, email, telefone FROM clientes ORDER BY id ASC;';
    const result = await pool.query(query);
    return result.rows.map(r => new Cliente(r.nome, r.email, r.telefone, r.id));
  }

  async buscarPorId(id: number): Promise<Cliente | null> {
    const query = 'SELECT id, nome, email, telefone FROM clientes WHERE id = $1;';
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) return null;
    const r = result.rows[0];
    return new Cliente(r.nome, r.email, r.telefone, r.id);
  }

  async buscarPorEmail(email: string): Promise<Cliente | null> {
    const query = 'SELECT id, nome, email, telefone FROM clientes WHERE email = $1;';
    const result = await pool.query(query, [email]);
    if (result.rows.length === 0) return null;
    const r = result.rows[0];
    return new Cliente(r.nome, r.email, r.telefone, r.id);
  }

  async atualizar(cliente: Cliente): Promise<Cliente | null> {
    const query = `
      UPDATE clientes SET nome = $1, email = $2, telefone = $3
      WHERE id = $4 RETURNING id, nome, email, telefone;
    `;
    const result = await pool.query(query, [cliente.nome, cliente.email, cliente.telefone, cliente.id]);
    if (result.rows.length === 0) return null;
    const r = result.rows[0];
    return new Cliente(r.nome, r.email, r.telefone, r.id);
  }

  async remover(id: number): Promise<boolean> {
    const result = await pool.query(`DELETE FROM clientes WHERE id = $1;`, [id]);
    return (result.rowCount ?? 0) > 0;
  }
}