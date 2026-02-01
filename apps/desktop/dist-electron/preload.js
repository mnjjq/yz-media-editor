"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  // IPC通信接口
  invoke: (channel, ...args) => {
    return electron.ipcRenderer.invoke(channel, ...args);
  },
  on: (channel, callback) => {
    electron.ipcRenderer.on(channel, (_, ...args) => callback(...args));
  }
});
