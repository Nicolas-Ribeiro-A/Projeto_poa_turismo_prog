import 'server-only';
import Database from 'better-sqlite3';
import path from 'path';
 
const db = new Database(path.join(process.cwd(), 'data', 'rituais.db'));
 
export function listarRituais(busca = '', elemento = '') {
  let sql = 'SELECT id, nome, elemento, circulo, execucao, alcance, alvo, duracao, resistencia, descricao FROM rituais WHERE nome LIKE ?';
  const valores = [`%${busca}%`];
 
  if (elemento) {
    sql += ' AND elemento = ?';
    valores.push(elemento);
  }
 
  sql += ' ORDER BY nome';
  return db.prepare(sql).all(...valores);
}
 
export function listarElementos() {
  return db.prepare('SELECT DISTINCT elemento FROM rituais ORDER BY elemento').all();
}
 
export function buscarRitual(id) {
  return db.prepare('SELECT * FROM rituais WHERE id = ?').get(id);
}
