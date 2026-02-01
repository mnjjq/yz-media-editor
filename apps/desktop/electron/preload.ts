import { contextBridge, ipcRenderer } from 'electron';

// 暴露安全的API给渲染进程

contextBridge.exposeInMainWorld('electronAPI', {
  // IPC通信接口
  invoke: (channel: string, ...args: any[]) => {
    return ipcRenderer.invoke(channel, ...args);
  },
  
  on: (channel: string, callback: (...args: any[]) => void) => {
    ipcRenderer.on(channel, (_, ...args) => callback(...args));
  },
});
