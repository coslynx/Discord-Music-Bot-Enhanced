import { SlashCommandBuilder } from 'discord.js';
import { ChatInputCommandInteraction } from 'discord.js';
import { musicPlayer } from '../music/musicPlayer';
import { logger } from '../utils/logger';

export const skipCommand = new SlashCommandBuilder()
  .setName('skip')
  .setDescription('Skips the currently playing song');

export const executeSkipCommand = async (interaction: ChatInputCommandInteraction) => {
  try {
    const queue = musicPlayer.getQueue();
    if (queue.length === 0) {
      await interaction.reply({ content: 'There are no songs in the queue.', ephemeral: true });
      return;
    }
    musicPlayer.skip();
    await interaction.reply({ content: 'Skipped the current song.', ephemeral: true });
  } catch (error) {
    logger.error('Error executing skip command:', error);
    await interaction.reply({ content: 'An error occurred while skipping the song.', ephemeral: true });
  }
};