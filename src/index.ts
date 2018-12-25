import cookieParser from "cookie-parser";
import { createServer } from "./server";

const server = createServer();
server.use(cookieParser());

server.start({
	cors: {
		credentials: true,
		origin: process.env.FRONTEND_URL
	}
});
