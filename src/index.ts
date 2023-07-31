import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  // creating gql server
  const gqlServer = new ApolloServer({
    typeDefs: `
    type Query {
        hello: String
        sayHello(name: String): String
    }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello World",
        sayHello: (_, { name }: { name: String }) => `Hello ${name}`,
      },
    },
  });

  // start the gql server
  await gqlServer.start();

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
}

init();
