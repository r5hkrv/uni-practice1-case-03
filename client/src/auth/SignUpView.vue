<script setup lang="ts">
import Card from "../components/Card.vue";
import AuthForm from "./AuthForm.vue";
</script>

<template>
  <h1>Sign up</h1>
  <Card>
    <AuthForm path="/signup" />
  </Card>
</template>
