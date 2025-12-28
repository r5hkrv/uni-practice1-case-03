<script setup lang="ts">
import { computed, shallowRef } from "vue";
import { useRouter } from "vue-router";

import { type AuthPath, getToken } from "../api";
import useAuthStore from "./useAuthStore";
import TextField from "../components/TextField.vue";

const props = defineProps<{ path: AuthPath }>();

const submitLabel = computed(() => {
  switch (props.path) {
    case "/signin":
      return "Continue";
    case "/signup":
      return "Create a new account";
  }
});

const fields = shallowRef({
  email: "",
  password: "",
});

const router = useRouter();
const { setToken } = useAuthStore();

const handleSubmit = async () => {
  const token = await getToken(props.path, fields.value);

  if (token === null) return;

  setToken(token);

  router.back();
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <TextField v-model="fields.email" id="email" label="E-Mail" />
    <TextField v-model="fields.password" id="password" label="Password" />
    <button type="submit">{{ submitLabel }}</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 1rem;
}
</style>
