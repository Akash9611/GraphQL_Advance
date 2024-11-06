import { ApolloServer } from '@apollo/server'
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4'
import cors from 'cors';
import express from 'express';
import { readFile } from 'node:fs/promises'
import { authMiddleware, handleLogin } from './auth.js';
import { resolvers } from './resolvers.js'

const port = process.env.PORT || 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

const typeDefs = await readFile('./schema.graphql', 'utf8');

// Setup Apollo Server
const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
// Graphql API endpoint
app.use('/graphql', apolloMiddleware(apolloServer));

app.post('/login', handleLogin);

app.listen({ port }, () => {
  console.log(`Server running on port ${port}`);
  console.log(`GraphQL Server API Endpoint is http://localhost:${port}/graphql`);

});
