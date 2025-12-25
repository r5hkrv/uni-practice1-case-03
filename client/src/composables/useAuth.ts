import { ref, watchEffect, shallowRef, computed } from "vue";

export type AuthRoutePath = "/signup" | "/signin";

const useAuth = (path: AuthRoutePath) => {
	const token = ref<string | null>(null);

	watchEffect(() => {
		if (token.value === null) return;

		console.log(token.value);
	});

	const fields = shallowRef({
		email: "",
		password: "",
	});

	const submitLabel = computed(() => {
		switch (path) {
			case "/signin":
				return "Continue";
			case "/signup":
				return "Create a new account";
		}
	});

	const handleSubmit = async () => {
		console.log(fields.value);
	};

	return {
		fields,
		submitLabel,
		handleSubmit,
	};
};

export default useAuth;
