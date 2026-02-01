# 一个electron+react+rust的音视频剪辑处理的应用工程目录:
video-editor-monorepo/
├─ apps/                         # 可运行应用
│  ├─ desktop/                   # Electron 桌面应用
│  │  ├─ electron/               # Electron 主进程
│  │  │  ├─ main.ts
│  │  │  ├─ preload.ts
│  │  │  ├─ ipc/
│  │  │  └─ window/
│  │  ├─ renderer/               # React 渲染进程
│  │  │  ├─ src/
│  │  │  │  ├─ pages/
│  │  │  │  ├─ components/
│  │  │  │  ├─ timeline/
│  │  │  │  ├─ hooks/
│  │  │  │  └─ store/
│  │  │  └─ main.tsx
│  │  ├─ assets/
│  │  ├─ package.json
│  │  └─ vite.config.ts
│  │
│  └─ playground/                # 可选：算法/渲染测试工具
│
├─ packages/                     # 共享能力（核心）
│  ├─ ui/                        # React UI 组件库
│  │  ├─ src/
│  │  └─ package.json
│  │
│  ├─ editor-core/               # 编辑器领域模型（纯 TS）
│  │  ├─ timeline/
│  │  ├─ track/
│  │  ├─ clip/
│  │  ├─ command/
│  │  └─ package.json
│  │
│  ├─ media-bridge/              # JS ↔ Rust 桥接层
│  │  ├─ src/
│  │  │  ├─ index.ts
│  │  │  └─ ffi.ts
│  │  └─ package.json
│  │
│  ├─ shared/                    # 通用工具 & 类型
│  │  ├─ types/
│  │  ├─ utils/
│  │  └─ package.json
│
├─ native/                       # Rust 原生层（性能核心）
│  ├─ media-engine/              # 音视频处理引擎
│  │  ├─ src/
│  │  │  ├─ decode/
│  │  │  ├─ encode/
│  │  │  ├─ filter/
│  │  │  ├─ timeline/
│  │  │  └─ lib.rs
│  │  ├─ Cargo.toml
│  │  └─ build.rs
│  │
│  └─ media-node/                # NAPI / C-ABI 封装
│     ├─ src/lib.rs
│     └─ Cargo.toml
│
├─ configs/                      # 统一配置
│  ├─ eslint/
│  ├─ tsconfig/
│  └─ vite/
│
├─ pnpm-workspace.yaml
├─ turbo.json
├─ package.json
└─ README.md

# 2.项目说明：
 1️⃣ Electron 只做「壳 + 调度」，绝不写重逻辑
 只负责：
    窗口管理
    IPC 通信
    文件系统权限
    调用 Rust / Node API
    🚫 禁止：
    时间轴算法
    音视频处理
    业务规则
    👉 原因：
    Electron 主进程一旦复杂 = debug 地狱

 2️⃣ React 渲染层 = 编辑器 UI + 交互
   apps/desktop/renderer
   这里你会放：
   时间轴 UI（timeline）
   轨道（track）
   波形 / 预览
   快捷键
   状态管理（Zustand / Redux）
   但注意：
   React 不知道“如何剪视频”，
   它只知道“用户想剪哪里”

3️⃣ editor-core：这是整个项目的「灵魂」
   packages/editor-core
   editor-core 应该是：
   纯 TypeScript
   无 UI
   无 Electron
   无 Rust
   它负责：
   时间轴模型
   轨道模型
   Clip 关系
   Command（撤销 / 重做）
   状态变更规则
   👉 React / Electron / Rust 都围绕它转

4️⃣ Rust = 性能核，专心干“脏活累活”
   native/media-engine
   Rust 层只干 4 件事：
   解码（ffmpeg / gstreamer）
   滤镜
   转码
   合成 / 导出
   它 不关心 UI，不关心用户操作。

5️⃣ media-bridge：唯一的跨语言边界
   packages/media-bridge
   这是战略级目录：
      JS ↔ Rust 的唯一入口
      封装 NAPI / C-ABI
      返回 Promise / Stream
      你要有一个铁律：
      ❌ React 不直接碰 Rust
      ❌ Electron 不直接碰 Rust
      ✅ 只能通过 bridge

四、数据与控制流（非常重要）
   用户操作
   ↓
   React UI
   ↓
   editor-core（生成编辑指令）
   ↓
   Electron IPC
   ↓
   media-bridge
   ↓
   Rust media-engine
Rust 的结果再一路往回推给 UI。


✔ 可扩展

加 AI：新建 native/ai-engine

加插件系统：新建 packages/plugin-api