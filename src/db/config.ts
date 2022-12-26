import { Dialect } from 'sequelize/types';

export const config = {
  database: {
    dialect: 'postgres' as Dialect,
    host: process.env.DATABASE_HOST || 'localhost',
    port: +process.env.DATABASE_PORT || 5432,
    username: process.env.DATABASE_USER || 'tradesignal',
    password: process.env.DATABASE_PASSWORD || 'tradesignalWn2@7X2gEDx',
    database: process.env.DATABASE_DATABASE || 'tsignal',
    logging: false,
  },
  jwtPrivateKey: 'jwtPrivateKey',
};
