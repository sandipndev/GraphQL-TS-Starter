import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

import { APP_PORT, MONGODB_URL } from "./config";

const setupServer = async () => {
  await mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  app.disable("x-powered-by");
  app.disable("etag");

  server.applyMiddleware({ app });

  app.listen(APP_PORT, () =>
    console.log(
      `🚀 Apollo Server - http://localhost:${APP_PORT}${server.graphqlPath}`
    )
  );
};

setupServer();
