import dotenv from 'dotenv';

const envPath = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envPath });

console.log({
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})

export const envConfig = {
  database: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  mainFolder: ['production', 'development'].includes(process.env.NODE_ENV)
    ? 'dist/src'
    : 'src',
  appSecret: process.env.APP_SECRET || 'default_test',
  appPort: process.env.APP_PORT || 3001,
};
