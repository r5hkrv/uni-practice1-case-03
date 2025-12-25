import path from "path";
import fs from "fs/promises";
import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const getContentType = (filepath: string) => {
	switch (path.extname(filepath)) {
		case ".html":
			return "text/html; charset=utf-8";
		case ".css":
			return "text/css; charset=utf-8";
		case ".js":
			return "text/javascript; charset=utf-8";
		default:
			return "text/plain; charset=utf-8";
	}
};

const getBuildArtifact = async (clientDist: string, filepath: string) => {
	filepath = path.resolve(clientDist, filepath);

	const data = await fs.readFile(filepath, "utf-8");
	const type = getContentType(filepath);

	return { data, type };
};

interface VueRouterFallbackOptions {
	clientDist: string;
}

type VueRouterFallbackPlugin = FastifyPluginAsync<VueRouterFallbackOptions>;

const vueRouterFallback: VueRouterFallbackPlugin = async (fastify, options) => {
	const { clientDist } = options;

	fastify.get("/*", async (request, reply) => {
		try {
			const artifact = await getBuildArtifact(clientDist, "index.html");

			reply.type(artifact.type).send(artifact.data);
		} catch (error) {
			reply.status(404);
		}
	});

	fastify.get("/assets/*", async (request, reply) => {
		try {
			const filepath = request.url.substring(1);
			const artifact = await getBuildArtifact(clientDist, filepath);

			reply.type(artifact.type).send(artifact.data);
		} catch (error) {
			reply.status(404);
		}
	});
};

export default fp(vueRouterFallback);
