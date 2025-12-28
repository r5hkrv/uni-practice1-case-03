<script setup lang="ts">
import useAuthStore from "../auth/useAuthStore";
import ProfileLayout from "./ProfileLayout.vue";

const { user } = useAuthStore();
</script>

<template>
  <ProfileLayout v-if="user !== null" :user title="Your profile" />
</template>
