import { ApolloServer } from '@apollo/server'
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4'
import cors from 'cors';
import express from 'express';
import { readFile } from 'node:fs/promises'
import { authMiddleware, handleLogin } from './auth.js';
import { resolvers } from './resolvers.js'
import { getUser } from './db/users.js';
import { createCompanyDataLoader } from './db/companies.js';

const port = process.env.PORT || 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post('/login', handleLogin);

const typeDefs = await readFile('./schema.graphql', 'utf8');

// With DataLoader logic 
// Authorization Context
async function getContext({ req }) {
  const companyLoader = createCompanyDataLoader()
  const context = { companyLoader }
  if (req.auth) {
    context.user = await getUser(req.auth.sub);
  }
  return context;
}
//! Without dataLoader logic 
// //* Authorization Context
// async function getContext({ req }) {

//   if (req.auth) {
//     const user = await getUser(req.auth.sub);
//     return { user };
//   }
//   return {}
// }
// Setup Apollo Server
const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
// Graphql API endpoint
app.use('/graphql', apolloMiddleware(apolloServer, { context: getContext }));


app.listen({ port }, () => {
  console.log(`Server running on port ${port}`);
  console.log(`GraphQL Server API Endpoint is http://localhost:${port}/graphql`);

});
