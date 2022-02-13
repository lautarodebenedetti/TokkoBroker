const { ApolloServer } = require("apollo-server");

import { resolvers, typeDefs } from "./schema";

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
