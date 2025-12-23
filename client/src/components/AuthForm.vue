<script setup lang="ts">
import { labelFromPath } from "../utils/string";
import TextField from "./TextField.vue";

const props = defineProps<{
  path: "/signup" | "/signin";
}>();

const handleSubmit = () => {
  console.log(`Fetch ${props.path}`);
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="form">
    <TextField id="name" label="Name" />
    <TextField id="password" label="Password" />
    <button type="submit">
      {{ labelFromPath(path, "sign") }}
    </button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 1rem;
}
</style>
