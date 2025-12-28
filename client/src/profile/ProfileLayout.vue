<script setup lang="ts">
import type { User } from "../api";

const props = defineProps<{ user: User; title: string }>();
</script>

<template>
  <h1>{{ title }}</h1>
</template>
