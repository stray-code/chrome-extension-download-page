import { defineConfig } from "vite";
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Webサイトダウンロード",
  description: "Webサイト（ページ）をダウンロードします。",
  version: "1.0.1",
  icons: {
    16: "img/icon16.png",
    48: "img/icon48.png",
    128: "img/icon128.png",
  },
  action: {
    default_popup: "src/popup/index.html",
  },
  permissions: ["tabs", "pageCapture"],
});

export default defineConfig({
  plugins: [crx({ manifest })],
  server: {
    cors: true,
  },
});
