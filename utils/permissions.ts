import { GuildMember } from 'discord.js';
import { logger } from './logger';

export interface Permissions {
  play: boolean;
  skip: boolean;
  stop: boolean;
  queue: boolean;
  nowplaying: boolean;
}

export class PermissionsManager {
  private permissions: Permissions;

  constructor() {
    this.permissions = {
      play: false,
      skip: false,
      stop: false,
      queue: false,
      nowplaying: false,
    };
  }

  /
    Checks if a user has specific permissions.
   
    @param member - The user to check permissions for.
    @param permission - The permission to check.
    @returns True if the user has the permission, false otherwise.
   /
  public hasPermissions(member: GuildMember, permission: keyof Permissions): boolean {
    try {
      const isAdmin = member.permissions.has('Administrator');
      const hasPermission = this.permissions[permission];
      logger.debug(`Checking permissions for user ${member.user.tag} for permission ${permission}`);
      logger.debug(`Is admin: ${isAdmin}, Has permission: ${hasPermission}`);
      return isAdmin || hasPermission;
    } catch (error) {
      logger.error(`Error checking permissions for user ${member.user.tag}:`, error);
      return false;
    }
  }

  /
    Sets the permissions for the bot.
   
    @param permissions - The permissions to set.
   /
  public setPermissions(permissions: Permissions): void {
    this.permissions = permissions;
    logger.info(`Permissions set:`, permissions);
  }
}

export const permissions = new PermissionsManager();