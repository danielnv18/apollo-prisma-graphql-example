import { GraphQLServer } from 'graphql-yoga';
import { database } from './database';
import { resolvers } from './resolvers';

// Create the GraphQL Yoga Server.
export function createServer(): GraphQLServer {
  return new GraphQLServer({
		context: (req: any) => ({
      ...req,
      database
    }),
		resolverValidationOptions: {
      requireResolversForResolveType: false
		},
		resolvers,
		typeDefs: 'src/schema.graphql',

  } as any);
}
