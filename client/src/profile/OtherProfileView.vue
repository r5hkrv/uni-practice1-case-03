<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import { type User, getProfileById } from "../api";
import ProfileLayout from "./ProfileLayout.vue";

const user = ref<User | null>(null);
const route = useRoute();

onMounted(async () => {
  try {
    user.value = await getProfileById(route.params.id as any);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <ProfileLayout v-if="user !== null" :user :title="user.email" />
</template>
