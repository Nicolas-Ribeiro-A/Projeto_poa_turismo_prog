import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buscarRitual } from '@/lib/db';
 
export const instant = false;
 
export default async function DetalheRitual({ params }) {
  const { id } = await params;
  const ritual = buscarRitual(id);
 
  if (!ritual) {
    notFound();
  }
 
  return (
    <article className="detalhe">
      <Link href="/rituais">← Voltar para a lista</Link>
      <h1>{ritual.nome}</h1>
      <span className="etiqueta">{ritual.elemento}</span>
      <p>{ritual.descricao}</p>
      <dl>
        <dt>círculo</dt>
        <dd>{ritual.circulo}</dd>
        <dt>execução</dt>
        <dd>{ritual.execucao}</dd>
        <dt>alcance</dt>
        <dd>{ritual.alcance}</dd>
        <dt>alvo</dt>
        <dd>{ritual.alvo}</dd>
        <dt>duração</dt>
        <dd>{ritual.duracao}</dd>
        <dt>resistência</dt>
        <dd>{ritual.resistencia}</dd>
      </dl>
    </article>
  );
}
