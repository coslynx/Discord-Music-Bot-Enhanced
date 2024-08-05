import { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } from '@discordjs/voice';
import { getSong, Song } from './song';
import { logger } from '../utils/logger';
import { Queue } from './queue';

export class MusicPlayer {
  private queue: Queue;
  private player: ReturnType<typeof createAudioPlayer>;
  private connection?: ReturnType<typeof joinVoiceChannel>;

  constructor() {
    this.queue = new Queue();
    this.player = createAudioPlayer();
    this.player.on('error', (error) => {
      logger.error('Music player error:', error);
    });
    this.player.on('finish', () => {
      this.playNextSong();
    });
  }

  async joinVoiceChannel(channelId: string): Promise<void> {
    try {
      this.connection = joinVoiceChannel({
        channelId,
        guildId: process.env.GUILD_ID || '',
        adapterCreator: process.env.ADAPTER_CREATOR || '',
      });
      this.connection.subscribe(this.player);
      logger.info('Joined voice channel.');
    } catch (error) {
      logger.error('Error joining voice channel:', error);
    }
  }

  async playSong(songName: string): Promise<Song | null> {
    try {
      const song: Song = await getSong(songName);
      if (!song) {
        return null;
      }
      this.queue.addSong(song);
      this.playNextSong();
      return song;
    } catch (error) {
      logger.error('Error playing song:', error);
      return null;
    }
  }

  async addSong(songName: string): Promise<Song | null> {
    try {
      const song: Song = await getSong(songName);
      if (!song) {
        return null;
      }
      this.queue.addSong(song);
      return song;
    } catch (error) {
      logger.error('Error adding song to queue:', error);
      return null;
    }
  }

  skip(): void {
    this.queue.skip();
    this.playNextSong();
  }

  stop(): void {
    if (this.isPlaying()) {
      this.player.stop();
      this.queue.clear();
    }
  }

  getQueue(): Song[] {
    return this.queue.getQueue();
  }

  getCurrentSong(): Song | null {
    return this.queue.getCurrentSong();
  }

  isPlaying(): boolean {
    return this.player.state.status === 'playing';
  }

  private async playNextSong(): Promise<void> {
    try {
      if (this.connection && !this.isPlaying()) {
        const currentSong: Song | null = this.queue.getNextSong();
        if (currentSong) {
          const resource = createAudioResource(currentSong.stream, {
            inputType: StreamType.Arbitrary,
          });
          this.player.play(resource);
        }
      }
    } catch (error) {
      logger.error('Error playing next song:', error);
    }
  }
}

export const musicPlayer = new MusicPlayer();