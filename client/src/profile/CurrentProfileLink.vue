<script setup lang="ts">
import type { User } from "../api";

const props = defineProps<{ user: User }>();
</script>

<template>
  <RouterLink to="/profile" class="user-profile-card">
    {{ user.email }}
  </RouterLink>
</template>

<style>
.user-profile-card {
  padding: 1rem;
  border-radius: 0.5rem;

  background-color: var(--color-gray-4);
  color: oklch(0 0 0);

  text-decoration: none;

  user-select: none;
}
</style>
