import type {
	FastifyRequest,
	FastifyReply,
	onRequestAsyncHookHandler,
} from "fastify";
import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";

declare module "fastify" {
	interface FastifyInstance {
		authenticate: onRequestAsyncHookHandler;
	}
}

export default fp((app) => {
	app.register(fastifyJwt, { secret: "temporary" });

	app.decorate(
		"authenticate",
		async (req: FastifyRequest, res: FastifyReply) => {
			try {
				await req.jwtVerify();
			} catch (error) {
				res.send(error);
			}
		}
	);
});
