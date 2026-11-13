import Link from 'next/link';
import './globals.css';
 
export const metadata = {
  title: 'Catálogo de Rituais',
  description: 'Catálogo de rituais e seus elementos',
};
 
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="topo">
          <Link href="/" className="logo">Catálogo de Rituais</Link>
          <nav>
            <Link href="/">Início</Link>
            <Link href="/rituais">Rituais</Link>
          </nav>
        </header>
        <main className="conteudo">{children}</main>
      </body>
    </html>
  );
}
