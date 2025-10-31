import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
   turbopack: {
    // ...
  },
  webpack: (config) => {
    // Configuração para o Firebase
    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias as object),
        // Normalizar diferenças de caixa em ambientes case-sensitive (Vercel)
        components: path.resolve(__dirname, "components"),
        Components: path.resolve(__dirname, "components"),
        "@/components": path.resolve(__dirname, "components"),
        "@/Components": path.resolve(__dirname, "components"),
      },
      fallback: {
        ...config.resolve?.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      }
    };
    return config;
  },
  // Configurações adicionais para melhorar o desenvolvimento
  reactStrictMode: true
};

export default nextConfig;

