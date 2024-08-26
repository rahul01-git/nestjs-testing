import { Dialect } from 'sequelize';
import 'dotenv/config';

interface ISequelizeConfig {
  [key: string]: {
    dialect: Dialect;
    url: string;
  };
}

const config: ISequelizeConfig = {
  development: {
    dialect: 'postgres',
    url: process.env.DATABASE_URL,
  },
  test: {
    dialect: 'postgres',
    url: process.env.DATABASE_URL,
  },
  production: {
    dialect: 'postgres',
    url: process.env.DATABASE_URL,
  },
};

export = config;
