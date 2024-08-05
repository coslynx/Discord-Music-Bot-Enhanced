import { SlashCommandBuilder } from 'discord.js';
import { musicPlayer } from '../music/musicPlayer';
import { EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';
import { logger } from '../utils/logger';

export const nowPlayingCommand = new SlashCommandBuilder()
  .setName('nowplaying')
  .setDescription('Displays the currently playing song');

export const executeNowPlayingCommand = async (interaction: ChatInputCommandInteraction) => {
  try {
    const currentSong = musicPlayer.getCurrentSong();
    if (!currentSong) {
      await interaction.reply({ content: 'There is no song currently playing.', ephemeral: true });
      return;
    }
    const songInfoEmbed = new EmbedBuilder()
      .setColor(0x00c6ff)
      .setTitle(currentSong.title)
      .setURL(currentSong.url)
      .setDescription(`By ${currentSong.artist}`)
      .setThumbnail(currentSong.thumbnail)
      .addFields({ name: 'Duration', value: currentSong.duration });
    await interaction.reply({ embeds: [songInfoEmbed], ephemeral: true });
  } catch (error) {
    logger.error('Error executing nowplaying command:', error);
    await interaction.reply({ content: 'An error occurred while fetching song information.', ephemeral: true });
  }
};