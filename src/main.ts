import express from "express";
import session from "express-session";

import redis from "redis";
import connectRedis from "connect-redis";

import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

import {
  APP_PORT,
  MONGODB_URL,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME,
  IN_PROD,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
} from "./config";

const setupServer = async () => {
  await mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: IN_PROD
      ? false
      : {
          settings: {
            "editor.theme": "light",
            "request.credentials": "include",
          },
        },
    context: ({ req, res }) => ({ req, res }),
  });

  const RedisStore = connectRedis(session);

  const redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT as number,
    password: REDIS_PASSWORD,
  });
  redisClient.unref();
  redisClient.on("error", console.log);

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      name: SESS_NAME,
      secret: SESS_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: parseInt(String(SESS_LIFETIME)),
        sameSite: true,
        secure: IN_PROD,
      },
    })
  );

  app.disable("x-powered-by");
  app.disable("etag");

  server.applyMiddleware({ app, cors: false });

  app.listen(APP_PORT, () =>
    console.log(
      `🚀 Apollo Server - http://localhost:${APP_PORT}${server.graphqlPath}`
    )
  );
};

setupServer();
