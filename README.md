# 音视频剪辑应用

基于 Electron + React + Rust 的专业音视频剪辑工具

## 架构

- **Electron**: 桌面应用壳，负责窗口管理和IPC通信
- **React**: UI层，提供编辑器界面和用户交互
- **editor-core**: 纯TypeScript编辑器核心，处理时间轴、轨道、片段等业务逻辑
- **Rust**: 高性能音视频处理引擎

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build
```

## 项目结构

详见 `info.md` 和 `.kiro/steering/项目架构规范.md`
