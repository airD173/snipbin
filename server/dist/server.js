import express from 'express';
const app = express();
import { ApolloServer } from 'apollo-server-express';
import schema from './schema.js';
import context from './context.js';
import * as dotenv from 'dotenv';
dotenv.config();
app.use(express.json());
const server = new ApolloServer({ schema, context });
server.applyMiddleware({ app, path: '/graphql', cors: false });
app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Started development server on http://localhost:${5000}`);
    console.log(`📈 Started GraphQL server on http://localhost:${5000}/graphql`);
});
