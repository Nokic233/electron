export {};

// 为 window 对象声明 versions 接口
declare global {
    interface Window {
        versions: {
            chrome: () => string;
            node: () => string;
            electron: () => string;
        };
    }
}
