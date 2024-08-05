import { createAudioResource, StreamType } from '@discordjs/voice';
import { ytdl } from 'ytdl-core';
import { logger } from '../utils/logger';

export interface Song {
  title: string;
  url: string;
  artist: string;
  duration: string;
  thumbnail: string;
  stream: ReturnType<typeof ytdl>;
}

export const getSong = async (songName: string): Promise<Song | null> => {
  try {
    const info = await ytdl.getInfo(songName);
    const stream = ytdl(songName, { filter: 'audioonly' });
    const song: Song = {
      title: info.videoDetails.title,
      url: info.videoDetails.video_url,
      artist: info.videoDetails.author.name,
      duration: info.videoDetails.lengthSeconds,
      thumbnail: info.videoDetails.thumbnail.thumbnails[0].url,
      stream,
    };
    return song;
  } catch (error) {
    logger.error('Error getting song:', error);
    return null;
  }
};