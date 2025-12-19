import bcrypt from "bcryptjs";
import { type FastifyInstance } from "fastify";

type IBody = {
	name: string;
	password: string;
};

const schema = {
	body: {
		type: "object",
		properties: {
			name: { type: "string" },
			password: { type: "string" },
		},
		required: ["name", "password"],
	},
};

// this is temporary; users will be saved to the database
const users: Record<string, string> = {};

export default function (app: FastifyInstance) {
	app.post<{ Body: IBody }>(
		"/signup",
		{ schema, attachValidation: true },
		async (req, res) => {
			if (req.validationError !== undefined) {
				return res.status(400).send(req.validationError);
			}
			const { name, password } = req.body;

			if (name in users) {
				res.status(400);

				return;
			}
			users[name] = await bcrypt.hash(password, 10);

			return res.jwtSign(
				{ username: name },
				{ sign: { expiresIn: "15m" } }
			);
		}
	);

	app.post<{ Body: IBody }>(
		"/signin",
		{ schema, attachValidation: true },
		async (req, res) => {
			if (req.validationError !== undefined) {
				return res.status(400).send(req.validationError);
			}
			const { name, password } = req.body;

			if (!(name in users)) {
				res.status(404);

				return;
			}
			if (!(await bcrypt.compare(password, users[name]))) {
				res.status(401);

				return;
			}
			return res.jwtSign(
				{ username: name },
				{ sign: { expiresIn: "15m" } }
			);
		}
	);
}
