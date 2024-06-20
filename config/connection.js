import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    dialectOptions: isProduction
      ? {
          ssl: {
            require: true, // Enable SSL connection
            rejectUnauthorized: false, // For self-signed certificates
          },
        }
      : {},
    logging: (msg) => console.log(msg), // Enable logging for debugging
  }
);

export default sequelize;
