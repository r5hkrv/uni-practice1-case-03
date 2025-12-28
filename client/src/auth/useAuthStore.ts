import { ref, watch } from "vue";
import { getProfile, type User } from "../api";

const token = ref<string | null>(null);

const useAuthStore = () => {
	const user = ref<User | null>(null);
	const setToken = (value: string) => {
		token.value = value;
	};

	watch(
		token,
		async () => {
			if (token.value === null) return;

			user.value = await getProfile(token.value);
		},
		{ immediate: true }
	);

	return { token, user, setToken };
};

export default useAuthStore;
