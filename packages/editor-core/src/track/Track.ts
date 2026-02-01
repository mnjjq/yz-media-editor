import { Clip } from '../clip/Clip';
import { MediaType, generateId } from '@video-editor/shared';

export class Track {
  public readonly id: string;
  public name: string;
  public type: MediaType;
  public clips: Clip[] = [];
  public muted: boolean = false;
  public locked: boolean = false;

  constructor(name: string, type: MediaType, id?: string) {
    this.id = id || generateId();
    this.name = name;
    this.type = type;
  }

  addClip(clip: Clip): void {
    if (clip.mediaType !== this.type) {
      throw new Error(`轨道类型不匹配: 期望 ${this.type}, 实际 ${clip.mediaType}`);
    }
    this.clips.push(clip);
    this.sortClips();
  }

  removeClip(clipId: string): boolean {
    const index = this.clips.findIndex(c => c.id === clipId);
    if (index !== -1) {
      this.clips.splice(index, 1);
      return true;
    }
    return false;
  }

  private sortClips(): void {
    this.clips.sort((a, b) => a.timelineRange.start - b.timelineRange.start);
  }

  getClipAt(time: number): Clip | undefined {
    return this.clips.find(
      clip => time >= clip.timelineRange.start && time < clip.timelineRange.end
    );
  }
}
