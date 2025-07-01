import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // 导入 Tailwind CSS Vite 插件

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], // 添加 tailwindcss 插件
});