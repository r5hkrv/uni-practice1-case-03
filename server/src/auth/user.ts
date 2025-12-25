import { prisma } from "../prisma.js";
import bcrypt from "bcryptjs";

import type { UserBodySchema } from "./user.schema.js";

export const createUser = async ({ email, password }: UserBodySchema) => {
	const user = await prisma.user.findUnique({ where: { email } });

	if (user !== null) return { statusCode: 400 };

	const pwhash = await bcrypt.hash(password, 10);

	await prisma.user.create({ data: { email, pwhash } });

	return { statusCode: 200 };
};

export const verifyUser = async ({ email, password }: UserBodySchema) => {
	try {
		const user = await prisma.user.findUniqueOrThrow({ where: { email } });
		const isPasswordOk = await bcrypt.compare(password, user.pwhash);

		if (!isPasswordOk) return { statusCode: 401 };

		return { statusCode: 200 };
	} catch (error) {
		return { statusCode: 404 };
	}
};
