import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';
import { createServer } from "./server";
import { database } from './database';

const server = createServer();
server.use(cookieParser());

// Decode the JWT so we can get the user Id on each request
server.express.use((req, res, next) => {
	const { token } = req.cookies
	if (token) {
		const userId = jwt.verify(token, process.env.APP_SECRET)
		// put the userId onto the req for future requests to access
		req.userId = userId;
	}
	next();
});

// Create a middleware that populates the user on each request
server.express.use(async (req, res, next) => {
	// if they aren't logged in, skip this
	if (!req.userId) next();
	const user = await database.query.user(
    {
      where: {
        id: req.userId
      }
    },
    '{ id, email, name }'
	);
	req.user = user;
	next();
});

server.start({
	cors: {
		credentials: true,
		origin: process.env.FRONTEND_URL
	}
});
