import { SlashCommandBuilder } from 'discord.js';
import { ChatInputCommandInteraction } from 'discord.js';
import { musicPlayer } from '../music/musicPlayer';
import { logger } from '../utils/logger';
import { permissions } from '../utils/permissions';
import { Song } from '../music/song';

export const playCommand = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Plays a song from YouTube, Spotify, or SoundCloud')
  .addStringOption((option) =>
    option.setName('song')
      .setDescription('The song to play')
      .setRequired(true),
  );

export const executePlayCommand = async (interaction: ChatInputCommandInteraction) => {
  try {
    const songName = interaction.options.getString('song');
    const queue = musicPlayer.getQueue();
    const user = interaction.member;
    if (!user) {
      await interaction.reply({ content: 'You must be in a voice channel to use this command.', ephemeral: true });
      return;
    }
    if (!interaction.member.voice.channel) {
      await interaction.reply({ content: 'You must be in a voice channel to use this command.', ephemeral: true });
      return;
    }
    if (!permissions.hasPermissions(interaction.member, 'play')) {
      await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
      return;
    }
    if (!interaction.guild?.members.me?.voice.channel) {
      await interaction.member.voice.channel.join();
    }
    if (musicPlayer.isPlaying()) {
      const song: Song = await musicPlayer.addSong(songName);
      await interaction.reply({ content: `Added ${song.title} to the queue.`, ephemeral: true });
      return;
    }
    const song: Song = await musicPlayer.playSong(songName);
    if (!song) {
      await interaction.reply({ content: 'Failed to play the song.', ephemeral: true });
      return;
    }
    await interaction.reply({ content: `Now playing ${song.title}`, ephemeral: true });
  } catch (error) {
    logger.error('Error executing play command:', error);
    await interaction.reply({ content: 'An error occurred while playing the song.', ephemeral: true });
  }
};