import { Message, Client } from 'discord.js';
import { commandHandler } from '../utils/commandHandler';
import { logger } from '../utils/logger';

export const messageCreateEventHandler = async (client: Client, message: Message) => {
  try {
    // Ignore messages from bots
    if (message.author.bot) return;

    // Check if the message is a command
    if (message.content.startsWith(process.env.PREFIX || '!')) {
      await commandHandler.handleCommand(client, message);
    }
  } catch (error) {
    logger.error('Error handling message:', error);
  }
};