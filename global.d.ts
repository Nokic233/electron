declare global {
    interface Window {
        versions: Versions;
        electronAPI: ElectronAPI;
    }
}
export interface Versions {
    chrome: () => string;
    node: () => string;
    electron: () => string;
    ping: () => Promise<string>;
}
export interface ElectronAPI {
    setTitle: (title: string) => void;
    openFile: () => Promise<string>;
    onUpdateCounter: (callback: (value: number) => void) => void;
    counterValue: (value: number) => void;
}
