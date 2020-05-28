export const {
  APP_PORT = 4000,
  NODE_ENV = "development",

  DB_USER = "chat-user",
  DB_PASS = "super-secret-password",
  DB_HOST = "localhost",
  DB_PORT = 27017,
  DB_NAME = "chat",
  DB_AUTHSOURCE = "chat",
} = process.env;

export const IN_PROD = NODE_ENV === "production";
export const MONGODB_URL = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=${DB_AUTHSOURCE}`;
