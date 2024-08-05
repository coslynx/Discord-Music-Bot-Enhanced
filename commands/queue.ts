import { SlashCommandBuilder } from 'discord.js';
import { ChatInputCommandInteraction } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import { musicPlayer } from '../music/musicPlayer';
import { logger } from '../utils/logger';

export const queueCommand = new SlashCommandBuilder()
  .setName('queue')
  .setDescription('Displays the current song queue');

export const executeQueueCommand = async (interaction: ChatInputCommandInteraction) => {
  try {
    const queue = musicPlayer.getQueue();
    if (queue.length === 0) {
      await interaction.reply({ content: 'There are no songs in the queue.', ephemeral: true });
      return;
    }
    const queueEmbed = new EmbedBuilder()
      .setColor(0x00c6ff)
      .setTitle('Current Queue')
      .setDescription(`${queue.length} songs in queue:`)
      .addFields(
        queue.map((song, index) => ({
          name: `${index + 1}. ${song.title}`,
          value: `By ${song.artist} - ${song.duration}`,
          inline: true,
        })),
      );
    await interaction.reply({ embeds: [queueEmbed], ephemeral: true });
  } catch (error) {
    logger.error('Error executing queue command:', error);
    await interaction.reply({ content: 'An error occurred while fetching queue information.', ephemeral: true });
  }
};