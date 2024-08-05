import { logger } from './logger';

export class ErrorHandler {
  /
    Logs an error and sends a message to the user.
   
    @param error - The error to handle.
    @param interaction - The Discord interaction object (optional).
    @param message - The message to send to the user (optional).
   /
  public static handleError(error: Error, interaction?: any, message?: string): void {
    logger.error('Error:', error);
    if (interaction) {
      // If an interaction is provided, send a message to the user
      interaction.reply({ content: message || 'An error occurred. Please try again later.', ephemeral: true });
    } else {
      // Otherwise, log the error to the console.
      console.error(message || 'An error occurred.');
    }
  }
}