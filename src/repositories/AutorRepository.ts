import { pool } from '../database/connection.js';
import { Autor } from '../models/Autor.js';

export class AutorRepository {
    async criar(autor: Autor): Promise<Autor>{
        const query = `
        INSERT INTO autores (nome, nacionalidade)
        VALUES ($1, $2) RETURNING id, nome, nacionalidade;
        `;
        const values = [autor.nome, autor.nacionalidade];
        const result = await pool.query(query, values);
        const row = result.rows[0];
        return new Autor(row.nome, row.nacionalidade, row.id);
    }

    async listarTodos(): Promise<Autor[]> {
        const query = `SELECT id, nome, nacionalidade FROM autores ORDER BY id ASC;`;
        const result = await pool.query(query);
        return result.rows.map(row => new Autor(row.nome, row.nacionalidade, row.id));
    }

    async buscarPorId(id: number): Promise<Autor | null>{
        const query = `SELECT id, nome, nacionalidade FROM autores WHERE id = $1;`;
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) return null;
        const row = result.rows[0];
        return new Autor(row.nome, row.nacionalidade, row.id);
    }

    async atualizar(autor: Autor): Promise<Autor | null>{
        const query = `
        UPDATE autores
        SET nome = $1, nacionalidade = $2
        WHERE id = $3
        RETURNING id, nome, nacionalidade;
        `;
        const values = [autor.nome, autor.nacionalidade, autor.id];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) return null;
        const row = result.rows[0];
        return new Autor(row.nome, row.nacionalidade, row.id);
    }

    async remover(id: number): Promise<boolean> {
        const query = `DELETE FROM autores WHERE id = $1;`;
        const result = await pool.query(query, [id]);
        return (result.rowCount ?? 0) > 0;
    }
}