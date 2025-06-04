# Electron 应用程序

这是一个基于Electron框架的桌面应用程序，使用TypeScript和Vite构建。

## 项目说明

该项目是一个基础的Electron应用程序，使用了以下技术栈：

- Electron: 跨平台桌面应用程序框架
- TypeScript: 类型安全的JavaScript超集
- Vite: 现代前端构建工具
- Electron Forge: Electron应用打包和分发工具

## 开发环境配置

### 前置要求

- Node.js (`v22`)
- npm

### 安装依赖

```bash
npm install
```

## 开发命令

### 启动开发服务器

启动应用程序进行开发和调试：

```bash
npm run start
```

这个命令会启动Electron应用程序，并打开开发者工具。应用程序会自动监听文件变化并热重载。

### 代码格式化

使用Prettier格式化代码：

```bash
npm run format
```

这个命令会格式化项目中的所有JS、TS、TSX、JSON、CSS和MD文件。

### 代码检查

使用ESLint检查代码质量：

```bash
npm run lint
```

这个命令会检查所有TS和TSX文件的代码质量问题。

## 构建和打包

### 打包应用程序

将应用程序打包为可分发的格式，但不创建安装程序：

```bash
npm run package
```

### 创建安装程序

创建平台特定的安装程序：

```bash
npm run make
```

这个命令会根据当前操作系统创建相应的安装程序：
- Windows: Squirrel.Windows (.exe)
- macOS: ZIP文件
- Linux: DEB和RPM包

### 发布应用程序

打包并发布应用程序：

```bash
npm run publish
```

## 项目结构

```
├── src/                  # 源代码目录
│   ├── App.vue           # Vue主组件
│   ├── main.ts           # 主进程入口文件
│   ├── preload.ts        # 预加载脚本
│   ├── renderer.ts       # 渲染进程脚本
│   └── index.css         # 样式文件
├── .github/              # GitHub配置目录
│   └── workflows/        # GitHub Actions工作流
│       └── main.yml      # 主工作流配置
├── scripts/              # 脚本目录
│   └── release.sh        # 发布脚本
├── index.html            # 主HTML文件
├── forge.config.ts       # Electron Forge配置
├── vite.main.config.ts   # 主进程Vite配置
├── vite.preload.config.ts # 预加载脚本Vite配置
├── vite.renderer.config.ts # 渲染进程Vite配置
├── tsconfig.json         # TypeScript配置
├── .eslintrc.json        # ESLint配置
├── .prettierrc.json      # Prettier配置
├── .npmrc                # NPM配置
├── .gitignore            # Git忽略文件配置
├── global.d.ts           # 全局类型声明
├── forge.env.d.ts        # Forge环境类型声明
└── package.json          # 项目配置和依赖
```

## 配置说明

### Electron Forge

项目使用Electron Forge进行打包和分发，配置文件为`forge.config.ts`。主要配置包括：

- 打包器配置：使用asar归档
- 构建器：支持Windows (Squirrel)、macOS (ZIP)、Linux (DEB和RPM)
- 插件：
  - VitePlugin：处理主进程、预加载脚本和渲染进程的构建
  - FusesPlugin：控制Electron功能的启用/禁用

### Vite

项目使用Vite作为构建工具，分为三个配置文件：

- `vite.main.config.ts`：主进程配置
- `vite.preload.config.ts`：预加载脚本配置
- `vite.renderer.config.ts`：渲染进程配置