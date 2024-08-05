import { SlashCommandBuilder } from 'discord.js';
import { ChatInputCommandInteraction } from 'discord.js';
import { musicPlayer } from '../music/musicPlayer';
import { logger } from '../utils/logger';

export const stopCommand = new SlashCommandBuilder()
  .setName('stop')
  .setDescription('Stops the music and clears the queue');

export const executeStopCommand = async (interaction: ChatInputCommandInteraction) => {
  try {
    const queue = musicPlayer.getQueue();
    if (queue.length === 0) {
      await interaction.reply({ content: 'There are no songs in the queue.', ephemeral: true });
      return;
    }
    musicPlayer.stop();
    await interaction.reply({ content: 'Stopped the music and cleared the queue.', ephemeral: true });
  } catch (error) {
    logger.error('Error executing stop command:', error);
    await interaction.reply({ content: 'An error occurred while stopping the music.', ephemeral: true });
  }
};