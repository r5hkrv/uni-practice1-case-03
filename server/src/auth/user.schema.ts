import type { FromSchema } from "json-schema-to-ts";

const userBodySchema = {
	type: "object",
	properties: {
		email: { type: "string" },
		password: { type: "string" },
	},
	required: ["email", "password"],
} as const;

export const userSchema = {
	body: userBodySchema,
	response: {
		200: {
			type: "object",
			properties: {
				statusCode: { type: "number" },
				payload: {
					type: "object",
					properties: {
						id: { type: "number" },
					},
				},
			},
		},
		"4xx": {
			type: "object",
			properties: {
				statusCode: { type: "number" },
				payload: { type: "null" },
			},
		},
	},
};

export type UserBodySchema = FromSchema<typeof userBodySchema>;
