import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  /* config options here */
  //додано домен для картинок з розділу journey
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'ftp.goit.study' }
    ]
  }
};

export default nextConfig;
