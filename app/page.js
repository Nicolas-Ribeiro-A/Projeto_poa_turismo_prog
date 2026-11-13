import Link from 'next/link';
import { connection } from 'next/server';
import { listarRituais, listarElementos } from '@/lib/db';
 
export const instant = false;
 
export default async function ListaRituais({ searchParams }) {
  await connection();
  const { q = '', elemento = '' } = await searchParams;
  const rituais = listarRituais(q, elemento);
  const elementos = listarElementos();
 
  return (
    <section>
      <h1>Rituais</h1>
 
      <form className="filtros">
        <input name="q" placeholder="Buscar pelo nome..." defaultValue={q} />
        <select name="elemento" defaultValue={elemento}>
          <option value="">Todos os elementos</option>
          {elementos.map((e) => (
            <option key={e.elemento} value={e.elemento}>{e.elemento}</option>
          ))}
        </select>
        <button type="submit">Filtrar</button>
      </form>
 
      {rituais.length === 0 && <p>Nenhum ritual encontrado.</p>}
 
      <ul className="grade">
        {rituais.map((ritual) => (
          <li key={ritual.id}>
            <Link href={`/rituais/${ritual.id}`} className="card">
              <h2>{ritual.nome}</h2>
              <p>Círculo {ritual.circulo}</p>
              <span className="etiqueta">{ritual.elemento}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
