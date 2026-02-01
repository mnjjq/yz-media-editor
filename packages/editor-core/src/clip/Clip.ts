import { TimeRange, MediaType, generateId } from '@video-editor/shared';

export interface ClipOptions {
  id?: string;
  mediaPath: string;
  mediaType: MediaType;
  sourceRange: TimeRange;
  timelineRange: TimeRange;
}

export class Clip {
  public readonly id: string;
  public mediaPath: string;
  public mediaType: MediaType;
  public sourceRange: TimeRange;
  public timelineRange: TimeRange;

  constructor(options: ClipOptions) {
    this.id = options.id || generateId();
    this.mediaPath = options.mediaPath;
    this.mediaType = options.mediaType;
    this.sourceRange = options.sourceRange;
    this.timelineRange = options.timelineRange;
  }

  getDuration(): number {
    return this.timelineRange.end - this.timelineRange.start;
  }

  trim(start: number, end: number): void {
    this.timelineRange = { start, end };
  }

  move(offset: number): void {
    this.timelineRange.start += offset;
    this.timelineRange.end += offset;
  }
}
