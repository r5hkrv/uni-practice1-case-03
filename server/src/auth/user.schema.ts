import type { FromSchema } from "json-schema-to-ts";

export const userBodySchema = {
	type: "object",
	properties: {
		email: { type: "string" },
		password: { type: "string" },
	},
	required: ["email", "password"],
} as const;

export type UserBodySchema = FromSchema<typeof userBodySchema>;
