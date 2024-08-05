import { Interaction, ChatInputCommandInteraction, Client } from 'discord.js';
import { commandHandler } from '../utils/commandHandler';
import { logger } from '../utils/logger';

export const interactionCreateEventHandler = async (client: Client, interaction: Interaction) => {
  try {
    if (interaction.isChatInputCommand()) {
      const commandInteraction = interaction as ChatInputCommandInteraction;
      await commandHandler.handleCommand(client, commandInteraction);
    }
  } catch (error) {
    logger.error('Error handling interaction:', error);
    await interaction.reply({ content: 'An error occurred while handling your request.', ephemeral: true });
  }
};