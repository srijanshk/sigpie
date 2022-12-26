import { Dialect } from 'sequelize/types';
require('dotenv').config();

console.log(
  {
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
  }
)

export const config = {
  database: {
    dialect: 'postgres' as Dialect,
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    logging: false,
  },
  jwtPrivateKey: 'jwtPrivateKey',
};
