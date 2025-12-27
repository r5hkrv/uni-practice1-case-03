import type { onRequestAsyncHookHandler, FastifyPluginAsync } from "fastify";
import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";

import authRoutes from "./routes.js";

declare module "fastify" {
	interface FastifyInstance {
		authenticate: onRequestAsyncHookHandler;
	}
}

type AuthPlugin = FastifyPluginAsync<{
	tokenExpiresIn: string | number;
}>;

const authPlugin: AuthPlugin = async (fastify, options) => {
	fastify.register(fastifyJwt, {
		secret: "temporary",
		sign: { expiresIn: options.tokenExpiresIn },
	});

	fastify.register(authRoutes);

	fastify.decorate("authenticate", async (request, reply) => {
		try {
			await request.jwtVerify();
		} catch (error) {
			reply.send(error);
		}
	});
};

export default fp(authPlugin);
