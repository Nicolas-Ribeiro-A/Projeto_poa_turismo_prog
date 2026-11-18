import Link from 'next/link';
 
export default function NaoEncontrado() {
  return (
    <section>
      <h1>Página não encontrada</h1>
      <p>O ritual que você procura não existe.</p>
      <p><Link href="/rituais">Voltar para a lista</Link></p>
    </section>
  );
}
