import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';


class Teams extends Model {
  public id!: number;
  public team_name!: string;
}

Teams.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  team_name: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Teams;
