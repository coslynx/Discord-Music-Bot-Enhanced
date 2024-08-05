import { Song } from "./song";

export class Queue {
  private queue: Song[] = [];
  private currentSongIndex = 0;

  addSong(song: Song): void {
    this.queue.push(song);
  }

  getNextSong(): Song | null {
    if (this.currentSongIndex + 1 < this.queue.length) {
      this.currentSongIndex += 1;
      return this.queue[this.currentSongIndex];
    }
    return null;
  }

  getCurrentSong(): Song | null {
    if (this.queue.length > 0) {
      return this.queue[this.currentSongIndex];
    }
    return null;
  }

  skip(): void {
    if (this.queue.length > 0) {
      this.currentSongIndex = (this.currentSongIndex + 1) % this.queue.length;
    }
  }

  clear(): void {
    this.queue = [];
    this.currentSongIndex = 0;
  }

  getQueue(): Song[] {
    return this.queue;
  }
}