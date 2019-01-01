import { GraphQLServer } from 'graphql-yoga';
import { resolvers } from './resolvers';
import { database } from './database';

// Create the GraphQL Yoga Server.
export function createServer(): GraphQLServer {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({
      ...req,
      database
    })
  }as any);
}
