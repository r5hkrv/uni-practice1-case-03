import fastify from "fastify";

import authPlugin from "./auth.plugin.js";
import authRoute from "./auth.route.js";

const app = fastify({ logger: true });

app.register(authPlugin);

app.register(authRoute);

app.register((app) => {
	app.get("/", { onRequest: app.authenticate }, async (request, reply) => {
		reply.send("Authorized!");
	});
});

try {
	await app.listen({ port: 3000 });
} catch (error) {
	app.log.error(error);
	process.exitCode = 1;
}
