import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // 현재 모드(mode)에 맞는 환경 변수 로드
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        "/api": {
          target: env.VITE_SERVER_URL,  // .env 파일의 VITE_SERVER_URL 사용
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    define: {
      "import.meta.env": JSON.stringify(env), // 환경 변수를 빌드 시 반영
    },
  };
});
