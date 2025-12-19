import fastify from "fastify";

const app = fastify({ logger: true });

app.get("/", async (request, reply) => {
	reply.send("Hello from Fastify!");
});

try {
	await app.listen({ port: 3000 });
} catch (error) {
	app.log.error(error);
	process.exitCode = 1;
}
