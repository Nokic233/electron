import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

// 在 Windows 上安装/卸载时处理创建/删除快捷方式。
if (started) {
    app.quit();
}

const createWindow = () => {
    // 创建浏览器窗口。
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // 加载应用的 index.html。
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
        mainWindow.loadFile(
            path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
        );
    }

    // 打开开发者工具。
    if (!app.isPackaged) {
        mainWindow.webContents.openDevTools();
    }
};

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法。
// 某些 API 只能在此事件发生后使用。
app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong');
    ipcMain.on('set-title', (event, title) => {
        console.log(event, title);
        const webContents = event.sender;
        const win = BrowserWindow.fromWebContents(webContents);
        win.setTitle(title);
    });
    createWindow();
});

// 当所有窗口关闭时退出应用，在 macOS 上除外。在 macOS 上，应用及其菜单栏
// 通常会保持活动状态，直到用户使用 Cmd + Q 明确退出。
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // 在 macOS 上，当点击 dock 图标且没有其他窗口打开时，
    // 通常会在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// 在此文件中，你可以包含应用程序特定的主进程代码。
// 你也可以将它们放在单独的文件中并在这里导入。
