// // vite.config.ts
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import basicSsl from '@vitejs/plugin-basic-ssl';
// import { VitePWA } from 'vite-plugin-pwa';

// export default defineConfig({
//     base: '/', // 루트에서 배포한다면 그대로
//     plugins: [
//         react(),
//         basicSsl(), // dev HTTPS
//         VitePWA({
//             registerType: 'autoUpdate',
//             filename: 'service-worker.js', // dist/service-worker.js 생성
//             injectRegister: 'auto', // index.html에 자동 삽입
//             manifest: {
//                 name: '다시다',
//                 short_name: '다시다',
//                 icons: [
//                     {
//                         src: '/icons/icon-192.png',
//                         sizes: '192x192',
//                         type: 'image/png',
//                     },
//                     {
//                         src: '/icons/icon-512.png',
//                         sizes: '512x512',
//                         type: 'image/png',
//                     },
//                 ],
//             },
//         }),
//     ],

//     /** dev 서버 설정 – 수정할 필요 거의 없음 */
//     server: {
//         host: 'dasida.org', // 로컬 개발 중 HTTPS 테스트용이면 OK
//         port: 3000,
//         https: {}, // 기본 self‑signed
//     },
// });

// vite.config.ts
import { defineConfig, type ServerOptions } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';
import path from 'path';

// ── HTTPS 옵션을 '없으면 undefined' 로 반환
function getHttpsConfig(): ServerOptions | undefined {
  const keyPath  = path.resolve(__dirname, 'dev.dasida.org+3-key.pem');
  const certPath = path.resolve(__dirname, 'dev.dasida.org+3.pem');

  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    return {
      key : fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    };
  }
  return undefined;          // ← false 대신 undefined
}

export default defineConfig({
  plugins: [
    react(),
    VitePWA({ /* …생략… */ }),
  ],
  server: {
    host: 'dev.dasida.org',
    port: 3000,
    https: getHttpsConfig(),
  },
  preview: {
    host: 'dev.dasida.org',
    port: 4173,
    https: getHttpsConfig(),
  },
});
