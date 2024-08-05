import { DataTypes, Model } from 'sequelize';
import { database } from '../database';

interface UserAttributes {
  id: string;
  guildId: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  playlists?: string[];
}

export class User extends Model<UserAttributes, UserAttributes> implements UserAttributes {
  public id!: string;
  public guildId!: string;
  public username!: string;
  public discriminator!: string;
  public avatar!: string | null;
  public playlists?: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    guildId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discriminator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    playlists: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    sequelize: database.sequelize,
    modelName: 'User',
    timestamps: true,
  },
);