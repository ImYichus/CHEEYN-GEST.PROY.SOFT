// cheeyn/next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // AÑADE ESTE BLOQUE DE CÓDIGO AQUÍ
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos', 
      },
    ],
  },
  // FIN DEL BLOQUE AÑADIDO
  
  /* config options here */
};

export default nextConfig;