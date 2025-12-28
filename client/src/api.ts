const BASE_URL = "http://localhost:3000/api";

export type AuthPath = "/signup" | "/signin";

export type UserCredentials = {
	email: string;
	password: string;
};

export const getToken = async (path: AuthPath, creds: UserCredentials) => {
	const reply = await fetch(`${BASE_URL}${path}`, {
		method: "post",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(creds),
	});

	if (!reply.ok) return null;

	return await reply.text();
};

export type User = {
	id: number;
	email: string;
};

export const getProfile = async (token: string): Promise<User | null> => {
	const reply = await fetch(`${BASE_URL}/profile`, {
		headers: { authorization: `Bearer ${token}` },
	});

	if (!reply.ok) return null;

	return await reply.json();
};

export const getProfileById = async (id: string): Promise<User | null> => {
	const reply = await fetch(`${BASE_URL}/profile/${id}`);

	if (!reply.ok) return null;

	return await reply.json();
};
