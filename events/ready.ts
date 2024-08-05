import { Client } from 'discord.js';
import { logger } from '../utils/logger';
import { config } from '../config/config';

export const readyEventHandler = async (client: Client) => {
  try {
    logger.info(`Logged in as ${client.user?.tag}`);
    client.user?.setActivity(config.presenceStatus, { type: 'PLAYING' });
  } catch (error) {
    logger.error('Error in ready event handler:', error);
  }
};