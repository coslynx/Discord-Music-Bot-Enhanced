import { logger } from './logger';
import { config } from '../config/config';

/
  Utility function to extract a valid YouTube video ID from a URL.
 
  @param url - The YouTube video URL to extract the ID from.
  @returns The YouTube video ID, or null if the URL is invalid.
 /
export const extractYouTubeVideoId = (url: string): string | null => {
  try {
    const matches = url.match(/(?:v=|vi=|embed\/)([^&?#]+)/);
    if (matches && matches.length > 1) {
      return matches[1];
    }
    return null;
  } catch (error) {
    logger.error('Error extracting YouTube video ID:', error);
    return null;
  }
};

/
  Utility function to format a duration in seconds into a human-readable format (HH:MM:SS).
 
  @param duration - The duration in seconds.
  @returns The formatted duration string.
 /
export const formatDuration = (duration: number): string => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  if (hours > 0) {
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  return `${formattedMinutes}:${formattedSeconds}`;
};

/
  Utility function to get the bot's presence status, either the default or a custom status.
 
  @param message - Optional Discord message to use for extracting a custom status.
  @returns The bot's presence status string.
 /
export const getPresenceStatus = (message?: string): string => {
  if (message) {
    // If a message is provided, use that as the custom status.
    return message;
  }
  // Otherwise, use the default status.
  return config.presenceStatus;
};