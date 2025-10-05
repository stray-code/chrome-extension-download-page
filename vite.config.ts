import { crx, defineManifest } from '@crxjs/vite-plugin';
import { defineConfig } from 'vite';

const manifest = defineManifest({
  manifest_version: 3,
  name: 'Webサイトダウンロード',
  description: 'Webサイト（ページ）をダウンロードします。',
  version: '1.0.1',
  icons: {
    16: 'img/icon16.png',
    48: 'img/icon48.png',
    128: 'img/icon128.png',
  },
  action: {
    default_popup: 'src/popup/index.html',
  },
  background: {
    service_worker: 'src/background/background.ts',
  },
  permissions: ['tabs', 'pageCapture', 'contextMenus', 'downloads'],
});

export default defineConfig({
  plugins: [crx({ manifest })],
  server: {
    cors: true,
  },
});
