/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // As imagens dos rituais vêm da wiki (Fandom). O CDN do Fandom exige um
    // cabeçalho Referer, que o otimizador do Next não envia; por isso as
    // imagens remotas usam `unoptimized` nos componentes.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wikia.nocookie.net',
        pathname: '/ordemparanormal/images/**',
      },
    ],
  },
};

export default nextConfig;
