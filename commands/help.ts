import { SlashCommandBuilder } from 'discord.js';
import { ChatInputCommandInteraction } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import { logger } from '../utils/logger';

export const helpCommand = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Displays a list of available commands.');

export const executeHelpCommand = async (interaction: ChatInputCommandInteraction) => {
  try {
    const commands = [
      { name: 'play', description: 'Plays a song from YouTube, Spotify, or SoundCloud' },
      { name: 'skip', description: 'Skips the currently playing song' },
      { name: 'stop', description: 'Stops the music and clears the queue' },
      { name: 'queue', description: 'Displays the current song queue' },
      { name: 'nowplaying', description: 'Displays the currently playing song' },
    ];

    const helpEmbed = new EmbedBuilder()
      .setColor(0x00c6ff)
      .setTitle('Available Commands')
      .setDescription('Here is a list of commands you can use:')
      .addFields(commands.map((command) => ({ name: `/${command.name}`, value: command.description })));

    await interaction.reply({ embeds: [helpEmbed], ephemeral: true });
  } catch (error) {
    logger.error('Error executing help command:', error);
    await interaction.reply({ content: 'An error occurred while fetching command information.', ephemeral: true });
  }
};