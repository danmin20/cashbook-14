import { DataTypes, Sequelize } from 'sequelize/types';

export default (sequelize: Sequelize) =>
  sequelize.define(
    'user',
    {
      email: {
        type: DataTypes.STRING(40),
        unique: true,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
