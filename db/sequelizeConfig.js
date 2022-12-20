require('dotenv').config();
module.exports = {
  development: {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: +process.env.DATABASE_PORT || 5432,
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_DATABASE || 'trade_signal',
    logging: false,
  },
};
