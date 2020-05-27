import express from "express";
import { ApolloServer } from "apollo-server-express";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const PORT = process.env.PORT || 4000;

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.disable("x-powered-by");
app.disable("etag");

server.applyMiddleware({ app });

app.listen(PORT, () =>
  console.log(
    `🚀 Apollo Server - http://localhost:${PORT}${server.graphqlPath}`
  )
);
