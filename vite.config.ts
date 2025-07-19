import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  base: '/',
  plugins: [react(), basicSsl()],
  server: {
    host: 'dasida.org',
    port: 3000,
    https: {} // true 대신 빈 객체를 사용하여 기본 SSL 옵션 사용
  }
})

// // // vite.config.ts
// import { defineConfig, type ServerOptions } from 'vite';
// import react from '@vitejs/plugin-react';
// import { VitePWA } from 'vite-plugin-pwa';
// import fs from 'fs';
// import path from 'path';

// // ── HTTPS 옵션을 '없으면 undefined' 로 반환
// function getHttpsConfig(): ServerOptions | undefined {
//   const keyPath  = path.resolve(__dirname, 'dev.dasida.org+3-key.pem');
//   const certPath = path.resolve(__dirname, 'dev.dasida.org+3.pem');

//   if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
//     return {
//       key : fs.readFileSync(keyPath),
//       cert: fs.readFileSync(certPath),
//     };
//   }
//   return undefined;          // ← false 대신 undefined
// }

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({ /* …생략… */ }),
//   ],
//   server: {
//     host: 'dev.dasida.org',
//     port: 3000,
//     https: getHttpsConfig(),
//   },
//   preview: {
//     host: 'dev.dasida.org',
//     port: 4173,
//     https: getHttpsConfig(),
//   },
// });
