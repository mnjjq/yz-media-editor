// 通用类型定义

export interface TimeRange {
  start: number;
  end: number;
}

export interface MediaMetadata {
  duration: number;
  width: number;
  height: number;
  fps: number;
  codec: string;
}

export type MediaType = 'video' | 'audio' | 'image';

export interface Point {
  x: number;
  y: number;
}
