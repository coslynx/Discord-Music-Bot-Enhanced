import { DataTypes, Model } from 'sequelize';
import { database } from '../database';

interface PlaylistAttributes {
  id: number;
  name: string;
  guildId: string;
  userId: string;
  songs: string[];
}

export class Playlist extends Model<PlaylistAttributes, PlaylistAttributes> implements PlaylistAttributes {
  public id!: number;
  public name!: string;
  public guildId!: string;
  public userId!: string;
  public songs!: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Playlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guildId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    songs: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    sequelize: database.sequelize,
    modelName: 'Playlist',
    timestamps: true,
  },
);