import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import type { onRequestAsyncHookHandler } from "fastify";

import { userSchema, type UserBodySchema } from "./user.schema.js";
import { createUser, verifyUser } from "./user.js";

const TOKEN_EXPIRY_TIME = "15m";

export default fp((server) => {
	server.register(fastifyJwt, {
		secret: "temporary",
		sign: { expiresIn: TOKEN_EXPIRY_TIME },
	});

	server.post<{ Body: UserBodySchema }>(
		"/signup",
		{ schema: userSchema, attachValidation: true },
		async (request, reply) => {
			if (request.validationError !== undefined) {
				return reply.status(400).send(request.validationError);
			}
			const { statusCode, payload } = await createUser(request.body);

			if (statusCode === 200 && payload !== null) {
				return await reply.jwtSign(payload);
			}
			reply.status(statusCode);
		}
	);

	server.post<{ Body: UserBodySchema }>(
		"/signin",
		{ schema: userSchema, attachValidation: true },
		async (request, reply) => {
			if (request.validationError !== undefined) {
				return reply.status(400).send(request.validationError);
			}
			const { statusCode, payload } = await verifyUser(request.body);

			if (statusCode === 200 && payload !== null) {
				return await reply.jwtSign(payload);
			}
			reply.status(statusCode);
		}
	);

	server.decorate("authenticate", async (request, reply) => {
		try {
			await request.jwtVerify();
		} catch (error) {
			reply.send(error);
		}
	});
});

declare module "fastify" {
	interface FastifyInstance {
		authenticate: onRequestAsyncHookHandler;
	}
}
