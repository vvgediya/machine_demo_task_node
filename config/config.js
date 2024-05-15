/**
 * File Name: config.js
 */
const envFound=require('dotenv').config();

module.exports = {
  port: parseInt(process.env.PORT, 10),
  node_env: process.env.NODE_ENV,
  database: {
    development: {
      url: process.env.DEV_DATABASE_URL,
    },
    test: {
      url: process.env.TEST_DATABASE_URL,
    },
    production: {
      url: process.env.PROD_DATABASE_URL,
    },
  },
  jwtSecret: process.env.JWT_SECRET || 'mysecretkey',
};
