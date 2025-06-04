/**
 * 此文件将被 vite 自动加载并在 "renderer" 上下文中运行。
 * 要了解更多关于 Electron 中 "main" 和 "renderer" 上下文的区别，
 * 请访问：
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * 默认情况下，此文件中的 Node.js 集成是禁用的。在 renderer 进程中
 * 启用 Node.js 集成时，请注意潜在的安全隐患。您可以在这里阅读更多
 * 关于安全风险的信息：
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * 要在此文件中启用 Node.js 集成，请打开 `main.ts` 并启用
 * `nodeIntegration` 标志：
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
