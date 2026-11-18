import { listarRituais } from '@/lib/db';
 
export async function GET(request) {
  const busca = request.nextUrl.searchParams.get('q') ?? '';
  const rituais = listarRituais(busca);
  return Response.json(rituais);
}
