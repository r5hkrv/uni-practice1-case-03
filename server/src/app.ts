import "dotenv/config";
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "node:path";

import prisma from "./plugins/prisma.js";
import auth from "./plugins/auth/index.js";
import vueRouterFallback from "./plugins/vueRouterFallback.js";

const app = fastify({ logger: true });

const configureOrigin: fastifyCors.OriginFunction = (origin, cb) => {
	if (origin !== undefined) {
		const hostname = new URL(origin).hostname;

		if (hostname === "localhost") {
			cb(null, true);

			return;
		}
	}
	cb(null, false);
};

app.register(fastifyCors, { origin: configureOrigin });

app.register(prisma, {
	adapter: new PrismaBetterSqlite3({ url: `${process.env.DATABASE_URL}` }),
});

app.register(auth, { tokenExpiresIn: "15m" });

app.register(vueRouterFallback, {
	clientBuildDir: path.resolve(import.meta.dirname, "../../client/dist"),
});

export default app;
