import { prisma } from "../prisma.js";
import bcrypt from "bcryptjs";

import type { UserBodySchema } from "./user.schema.js";

export const createUser = async ({ email, password }: UserBodySchema) => {
	let user = await prisma.user.findUnique({ where: { email } });

	if (user !== null) return { statusCode: 400, payload: null };

	const pwhash = await bcrypt.hash(password, 10);
	user = await prisma.user.create({ data: { email, pwhash } });

	return { statusCode: 200, payload: { id: user.id } };
};

export const verifyUser = async ({ email, password }: UserBodySchema) => {
	try {
		const user = await prisma.user.findUniqueOrThrow({ where: { email } });
		const isPasswordOk = await bcrypt.compare(password, user.pwhash);

		if (!isPasswordOk) return { statusCode: 401, payload: null };

		return { statusCode: 200, payload: { id: user.id } };
	} catch (error) {
		return { statusCode: 404, payload: null };
	}
};
