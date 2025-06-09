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

const config: ForgeConfig = {
    packagerConfig: {
        asar: true,
    },
    rebuildConfig: {},
    makers: [
        new MakerSquirrel({}),
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
            generateReleaseNotes: true,
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
