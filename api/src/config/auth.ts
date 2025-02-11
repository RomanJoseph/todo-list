import dotenv from 'dotenv';
import { envConfig } from './envConfig';
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const authConfig = {
  jwt: {
    secret: envConfig.appSecret,
    expiresIn: '1d',
  },
  config_path: `${__dirname}`,
};

export default authConfig;
