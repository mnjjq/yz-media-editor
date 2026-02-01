import { MediaMetadata } from '@video-editor/shared';

// JS ↔ Rust 桥接层
// 这是唯一允许调用Rust的地方

export class MediaBridge {
  private nativeModule: any = null;

  async initialize(): Promise<void> {
    // TODO: 加载Rust NAPI模块
    // this.nativeModule = require('../../native/media-node');
    console.log('MediaBridge 初始化');
  }

  async getMediaInfo(filePath: string): Promise<MediaMetadata> {
    // TODO: 调用Rust获取媒体信息
    return {
      duration: 0,
      width: 1920,
      height: 1080,
      fps: 30,
      codec: 'h264'
    };
  }

  async decodeFrame(filePath: string, timestamp: number): Promise<ArrayBuffer> {
    // TODO: 调用Rust解码帧
    return new ArrayBuffer(0);
  }

  async exportVideo(config: any): Promise<void> {
    // TODO: 调用Rust导出视频
    console.log('导出视频', config);
  }
}

export const mediaBridge = new MediaBridge();
