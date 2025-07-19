// pwa-assets.config.js (프로젝트 루트에 생성)
import {
  defineConfig,
  minimal2023Preset as preset,   // ⬅️ 권장 프리셋
} from '@vite-pwa/assets-generator/config';

export default defineConfig({
  // ① 어떤 세트(프리셋)로 만들 건지
  preset,

  // ② 원본 이미지(들)
  images: ['public/logo.svg'],

  /* 선택 옵션 예시
  outputDir: 'public',         // 결과 저장 위치
  override: true,              // 기존 파일 덮어쓰기
  favicon: true,               // favicon.ico 포함
  background: '#ffffff',       // iOS 스플래시 색
  */
});
