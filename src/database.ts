import { Prisma } from 'prisma-binding';

const database = new Prisma({
	debug: false,
	endpoint: process.env.PRISMA_ENDPOINT,
	secret: process.env.PRISMA_SECRET,
	typeDefs: 'src/generated/prisma.graphql',
});

export  {
	database
}
