export const {
  APP_PORT = 4000,
  NODE_ENV = "development",

  DB_USER = "chat-user",
  DB_PASS = "super-secret-password",
  DB_HOST = "localhost",
  DB_PORT = 27017,
  DB_NAME = "chat",
  DB_AUTHSOURCE = "chat",

  SESS_NAME = "sid",
  SESS_SECRET = "top-secret",
  SESS_LIFETIME = 1000 * 60 * 60 * 2,

  REDIS_HOST = "localhost",
  REDIS_PORT = 6379,
  REDIS_PASSWORD = "secret-redis-password",
} = process.env;

export const IN_PROD = NODE_ENV === "production";
export const MONGODB_URL = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=${DB_AUTHSOURCE}`;
