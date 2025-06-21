import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  // base: '/',
  base: '/',   // ★ 절대 경로 꼭!
  plugins: [react(), basicSsl()],
  server: {
    
    host: 'dev.dasida.org',
    // host: 'dasida.org',

    port: 3000,
    https: {} // true 대신 빈 객체를 사용하여 기본 SSL 옵션 사용
  }
})
