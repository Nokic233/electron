import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDMG } from '@electron-forge/maker-dmg';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { PublisherGithub } from '@electron-forge/publisher-github';
import { VitePlugin } from '@electron-forge/plugin-vite';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import moduleName from 'electron-forge-maker-nsis';

const config: ForgeConfig = {
    packagerConfig: {
        asar: true,
    },
    rebuildConfig: {},
    makers: [
        new MakerSquirrel({}),
        {
            name: 'electron-forge-maker-nsis',
            config: {
                // ↓ 传递给 electron-builder 的 NSIS 配置选项
                codesigning: {
                    // 可选，用于代码签名
                    // certificateFile: "路径/to/cert.pfx",
                    // certificatePassword: process.env.CERT_PASS,
                },
                updater: {
                    // 可选，支持通过 electron-updater 实现自动更新
                    // url: "https://your-cdn.com/updates",
                    // publisherName: "你的公司名",
                },
                getAdditionalConfig: () => ({
                    // 自定义输出文件名
                    artifactName: '${productName}Setup${version}.${ext}',
                    // 启用一键安装
                    oneClick: false,
                    // 为全局安装（所有用户）
                    perMachine: false,
                    // 允许用户自定义安装目录
                    allowToChangeInstallationDirectory: true,
                    // // 显示语言选择界面
                    // displayLanguageSelector: true,
                    // // 支持的语言列表
                    // installerLanguages: ['en_US', 'zh_CN'],
                }),
            },
        },
        new MakerZIP({}),
        new MakerDMG({}),
        new MakerRpm({}),
        new MakerDeb({}),
    ],
    publishers: [
        new PublisherGithub({
            repository: {
                owner: 'Nokic233',
                name: 'electron',
            },
            prerelease: false,
            draft: false,
        }),
    ],
    plugins: [
        new VitePlugin({
            // `build` 可以指定多个入口构建，可以是主进程、预加载脚本、工作进程等
            // 如果你熟悉 Vite 配置，这看起来会非常熟悉
            build: [
                {
                    // `entry` 只是 `config` 对应文件中 `build.lib.entry` 的别名
                    entry: 'src/main.ts',
                    config: 'vite.main.config.ts',
                    target: 'main',
                },
                {
                    entry: 'src/preload.ts',
                    config: 'vite.preload.config.ts',
                    target: 'preload',
                },
            ],
            renderer: [
                {
                    name: 'main_window',
                    config: 'vite.renderer.config.ts',
                },
            ],
        }),
        // Fuses 用于在打包时启用/禁用各种 Electron 功能
        // 这发生在应用程序代码签名之前
        new FusesPlugin({
            version: FuseVersion.V1,
            [FuseV1Options.RunAsNode]: false,
            [FuseV1Options.EnableCookieEncryption]: true,
            [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
            [FuseV1Options.EnableNodeCliInspectArguments]: false,
            [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
            [FuseV1Options.OnlyLoadAppFromAsar]: true,
        }),
    ],
};

export default config;
