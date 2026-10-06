import { pool } from '../database/connection.js';
import { Emprestimo } from '../models/Emprestimo.js';

export class EmprestimoRepository {
  async criar(livroId: number, clienteId: number): Promise<Emprestimo> {
    const query = `
      INSERT INTO emprestimos (livro_id, cliente_id, data_emprestimo, data_devolucao)
      VALUES ($1, $2, NOW(), NULL) RETURNING id, livro_id, cliente_id, data_emprestimo, data_devolucao;
    `;
    const result = await pool.query(query, [livroId, clienteId]);
    const row = result.rows[0];
    return new Emprestimo(Number(row.livro_id), Number(row.cliente_id), (row.id), new Date(row.data_emprestimo), (row.data_devolucao));
  }

  async registrarDevolucao(emprestimoId: number): Promise<Emprestimo | null> {
    const query = `
      UPDATE emprestimos 
      SET data_devolucao = NOW()
      WHERE id = $1 AND data_devolucao IS NULL
      RETURNING id, livro_id, cliente_id, data_emprestimo, data_devolucao;
    `;
    const result = await pool.query(query, [emprestimoId]);
    if (result.rows.length === 0) return null;
    const r = result.rows[0];
    return new Emprestimo(Number(r.livro_id), Number(r.cliente_id), (r.id), r.data_emprestimo, (r.data_devolucao));
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
    return new Emprestimo(Number(r.livro_id), Number(r.cliente_id), (r.id), r.data_emprestimo, r.data_devolucao, r.livro_titulo, r.cliente_nome);
  }

  async listarTodos(): Promise<Emprestimo[]> {
    const query = `
      SELECT e.id, e.livro_id, e.cliente_id, e.data_emprestimo, e.data_devolucao,
             l.titulo as livro_titulo, c.nome as cliente_nome
      FROM emprestimos e
      INNER JOIN livros l ON e.livro_id = l.id
      INNER JOIN clientes c ON e.cliente_id = c.id
      ORDER BY e.id DESC;
    `;
    const result = await pool.query(query);
    return result.rows.map(
      r => new Emprestimo(Number(r.livro_id), Number(r.cliente_id), (r.id), r.data_emprestimo, r.data_devolucao, r.livro_titulo, r.cliente_nome)
    );
  }

  async relatorioLivrosDisponiveis(): Promise<any[]> {
    const query = `
      SELECT l.id, l.titulo, a.nome AS autor, l.quantidade_disponivel
      FROM livros l
      INNER JOIN autores a ON l.autor_id = a.id
      WHERE l.quantidade_disponivel > 0
      ORDER BY l.titulo ASC;
    `;
    return (await pool.query(query)).rows;
  }

  async relatorioLivrosEmprestados(): Promise<any[]> {
    const query = `
      SELECT e.id AS emprestimo_id, l.titulo AS livro, c.nome AS cliente, e.data_emprestimo
      FROM emprestimos e
      INNER JOIN livros l ON e.livro_id = l.id
      INNER JOIN clientes c ON e.cliente_id = c.id
      WHERE e.data_devolucao IS NULL
      ORDER BY e.data_emprestimo ASC;
    `;
    return (await pool.query(query)).rows;
  }

  async relatorioLivrosPorAutor(): Promise<any[]> {
    const query = `
      SELECT a.nome AS autor, COUNT(l.id) AS total_livros
      FROM autores a
      LEFT JOIN livros l ON a.id = l.autor_id
      GROUP BY a.id, a.nome
      ORDER BY total_livros DESC;
    `;
    return (await pool.query(query)).rows;
  }

  async relatorioQuantidadeEmprestimosPorLivro(): Promise<any[]> {
    const query = `
      SELECT l.titulo AS livro, COUNT(e.id) AS total_emprestimos
      FROM livros l
      LEFT JOIN emprestimos e ON l.id = e.livro_id
      GROUP BY l.id, l.titulo
      ORDER BY total_emprestimos DESC;
    `;
    return (await pool.query(query)).rows;
  }

  async relatorioClientesEmprestimosAtivos(): Promise<any[]> {
    const query = `
      SELECT c.id, c.nome, c.email, COUNT(e.id) AS emprestimos_ativos
      FROM clientes c
      INNER JOIN emprestimos e ON c.id = e.cliente_id
      WHERE e.data_devolucao IS NULL
      GROUP BY c.id, c.nome, c.email
      HAVING COUNT(e.id) > 0;
    `;
    return (await pool.query(query)).rows;
  }
}  
