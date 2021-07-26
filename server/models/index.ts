import { Sequelize } from 'sequelize';
import User from './user';

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PW as string,
  {
    host: process.env.DB_HOST,
  }
);

export default {
  sequelize,
  Sequelize,
  User: User(sequelize),
};
