// tslint:disable-next-line
require("dotenv").config();

export default {
  SERVER_PORT: process.env.SERVER_PORT,
  SECRET_OR_KEY: process.env.SECRET_OR_KEY,
  DB_URL: process.env.DB_URL,
  DB_NAME: process.env.DB_NAME,
  DB_USER_COLLECTION: process.env.DB_USER_COLLECTION,
  DB_VAULT_COLLECTION: process.env.DB_VAULT_COLLECTION,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD
};
