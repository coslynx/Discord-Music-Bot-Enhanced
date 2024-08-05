import { VoiceState, Client } from 'discord.js';
import { musicPlayer } from '../music/musicPlayer';
import { logger } from '../utils/logger';

export const voiceStateUpdateEventHandler = async (client: Client, oldState: VoiceState, newState: VoiceState) => {
  try {
    // If the bot is in a voice channel and a user leaves that voice channel, disconnect if the bot is alone
    if (oldState.channelId === newState.channelId
      && oldState.member?.id === client.user?.id
      && newState.member?.voice.channel?.members.size === 1) {
      logger.info('Bot is alone in the voice channel, disconnecting.');
      await newState.channel?.leave();
    }

    // If the bot is not in a voice channel and a user joins a voice channel, join the user's voice channel
    if (newState.member?.voice.channel?.members.size > 1
      && newState.member?.id !== client.user?.id
      && !newState.member?.voice.channel?.members.find((member) => member.id === client.user?.id)) {
      logger.info(`Joining user's voice channel: ${newState.member.voice.channel.name}`);
      await newState.member.voice.channel.join();
    }
  } catch (error) {
    logger.error('Error handling voice state update:', error);
  }
};