import { Sequelize } from 'sequelize-typescript';
import Analysis from '../models/Analysis';

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: 'mysql',
  logging: false
});

sequelize.addModels([Analysis]);

export default sequelize;
