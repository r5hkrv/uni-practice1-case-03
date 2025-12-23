import fastify from "fastify";
import path from "path";
import fs from "fs/promises";

import auth from "./auth/index.js";

const resolveClientBuild = (filepath: string) => {
	return path.resolve(import.meta.dirname, "../../client/dist", filepath);
};

const app = fastify({ logger: true });

app.register(auth);

app.register((app) => {
	app.get("/*", async (request, reply) => {
		try {
			const data = await fs.readFile(resolveClientBuild("index.html"));

			reply.type("text/html").send(data);
		} catch (error) {
			reply.status(404);
		}
	});

	app.get("/assets/*", async (request, reply) => {
		try {
			const filepath = request.url.substring(1);
			const ext = filepath.split(".")[1];
			const data = await fs.readFile(resolveClientBuild(filepath));

			reply.type(`text/${ext === "js" ? "javascript" : ext}`).send(data);
		} catch (error) {
			reply.status(404);
		}
	});

	app.get(
		"/auth",
		{ onRequest: app.authenticate },
		async (request, reply) => {
			reply.send("Authorized!");
		}
	);
});

try {
	await app.listen({ port: 3000 });
} catch (error) {
	app.log.error(error);
	process.exitCode = 1;
}
