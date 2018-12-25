import { Prisma } from 'prisma-binding';

const database = new Prisma({
	typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: false
});

export  {
	database
}
