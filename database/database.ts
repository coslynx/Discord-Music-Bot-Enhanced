import { Sequelize } from 'sequelize';
import { logger } from '../utils/logger';
import { Guild } from './models/guild';
import { User } from './models/user';
import { Playlist } from './models/playlist';

const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
  dialect: 'mysql',
  logging: false,
});

export const database = {
  sequelize,
  Sequelize,
  models: {
    Guild,
    User,
    Playlist,
  },
  async connect(): Promise<void> {
    try {
      await sequelize.authenticate();
      logger.info('Connection has been established successfully.');
      // Initialize models
      await this.models.Guild.sync();
      await this.models.User.sync();
      await this.models.Playlist.sync();
    } catch (error) {
      logger.error('Unable to connect to the database:', error);
      // Handle connection errors
      // You could implement error handling like:
      // - Retrying to connect after a delay
      // - Sending an alert to the bot developer
      // - Logging the error to a file for later investigation
    }
  },
};