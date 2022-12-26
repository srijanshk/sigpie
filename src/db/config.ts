import { Dialect } from 'sequelize/types';
require('dotenv').config();

console.log(
  {
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  }
)

export const config = {
  database: {
    dialect: 'postgres' as Dialect,
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    logging: false,
  },
  jwtPrivateKey: 'jwtPrivateKey',
};
