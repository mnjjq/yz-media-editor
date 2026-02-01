import { Track } from '../track/Track';
import { MediaType, generateId } from '@video-editor/shared';

export class Timeline {
  public readonly id: string;
  public tracks: Track[] = [];
  public currentTime: number = 0;
  public duration: number = 0;

  constructor(id?: string) {
    this.id = id || generateId();
  }

  addTrack(type: MediaType, name?: string): Track {
    const trackName = name || `${type}轨道 ${this.tracks.length + 1}`;
    const track = new Track(trackName, type);
    this.tracks.push(track);
    return track;
  }

  removeTrack(trackId: string): boolean {
    const index = this.tracks.findIndex(t => t.id === trackId);
    if (index !== -1) {
      this.tracks.splice(index, 1);
      return true;
    }
    return false;
  }

  getTrack(trackId: string): Track | undefined {
    return this.tracks.find(t => t.id === trackId);
  }

  seek(time: number): void {
    this.currentTime = Math.max(0, Math.min(time, this.duration));
  }

  calculateDuration(): number {
    let maxDuration = 0;
    for (const track of this.tracks) {
      for (const clip of track.clips) {
        maxDuration = Math.max(maxDuration, clip.timelineRange.end);
      }
    }
    this.duration = maxDuration;
    return maxDuration;
  }
}
