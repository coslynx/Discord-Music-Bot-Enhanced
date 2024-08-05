import { Client, ChatInputCommandInteraction, Message } from 'discord.js';
import { logger } from './logger';
import { playCommand, executePlayCommand } from '../commands/play';
import { skipCommand, executeSkipCommand } from '../commands/skip';
import { stopCommand, executeStopCommand } from '../commands/stop';
import { queueCommand, executeQueueCommand } from '../commands/queue';
import { helpCommand, executeHelpCommand } from '../commands/help';
import { nowPlayingCommand, executeNowPlayingCommand } from '../commands/nowPlaying';

export class CommandHandler {
  private commands: {
    [name: string]: {
      command: any; // command builder
      execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
    };
  } = {};

  constructor() {
    // Register all commands
    this.registerCommand(playCommand, executePlayCommand);
    this.registerCommand(skipCommand, executeSkipCommand);
    this.registerCommand(stopCommand, executeStopCommand);
    this.registerCommand(queueCommand, executeQueueCommand);
    this.registerCommand(helpCommand, executeHelpCommand);
    this.registerCommand(nowPlayingCommand, executeNowPlayingCommand);
  }

  private registerCommand(command: any, execute: (interaction: ChatInputCommandInteraction) => Promise<void>): void {
    this.commands[command.name] = { command, execute };
  }

  public async handleCommand(client: Client, interaction: ChatInputCommandInteraction | Message): Promise<void> {
    try {
      if (interaction.isChatInputCommand()) {
        const commandName = interaction.commandName;
        const command = this.commands[commandName];
        if (command) {
          await command.execute(interaction);
        } else {
          await interaction.reply({ content: `Unknown command: /${commandName}`, ephemeral: true });
        }
      } else if (interaction instanceof Message && interaction.content.startsWith(process.env.PREFIX || '!')) {
        const commandArgs = interaction.content.slice(process.env.PREFIX?.length || 1).trim().split(' ');
        const commandName = commandArgs.shift()?.toLowerCase();
        const command = this.commands[commandName];
        if (command) {
          // Handle text-based commands (may need to adjust this based on command structure)
          await command.execute(interaction);
        } else {
          await interaction.reply({ content: `Unknown command: ${commandName}`, ephemeral: true });
        }
      }
    } catch (error) {
      logger.error('Error handling command:', error);
      if (interaction.isChatInputCommand() || interaction instanceof Message) {
        await interaction.reply({ content: 'An error occurred while executing the command.', ephemeral: true });
      }
    }
  }
}

export const commandHandler = new CommandHandler();