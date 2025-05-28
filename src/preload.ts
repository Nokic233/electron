// 查看 Electron 文档了解如何使用预加载脚本的详细信息：
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping'),
});

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title: string) => ipcRenderer.send('set-title', title),
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
});
