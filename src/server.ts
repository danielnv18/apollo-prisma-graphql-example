import { GraphQLServer } from 'graphql-yoga';
import { Query } from './resolvers/query';
import { Mutation } from './resolvers/mutation';
import { database } from './database';

// Create the GraphQL Yoga Server.
export function createServer(): GraphQLServer {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Mutation,
      Query
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({
      ...req,
      database
    })
  });
}
