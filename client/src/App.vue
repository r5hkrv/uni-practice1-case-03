<script setup lang="ts">
import { ref, watch } from "vue";

import { type User, getProfile } from "./api";
import useAuthStore from "./auth/useAuthStore";
import FancyLink from "./components/FancyLink.vue";
import CurrentProfileLink from "./profile/CurrentProfileLink.vue";

const user = ref<User | null>(null);

const { token } = useAuthStore();

watch(token, async () => {
  if (token.value === null) return;

  user.value = await getProfile(token.value);
});
</script>

<template>
  <header id="header" class="header">
    <nav id="header-nav">
      <div id="header-nav-left">
        <FancyLink to="/">Home</FancyLink>
      </div>
      <div id="header-nav-right">
        <CurrentProfileLink v-if="user !== null" :user />
        <FancyLink v-else to="/signin">Sign in</FancyLink>
      </div>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style>
#header {
  margin-bottom: 2rem;
}

#header-nav,
#header-nav-left,
#header-nav-right {
  display: flex;
  align-items: center;
  column-gap: 1rem;
}

#header-nav {
  padding-inline: 1rem;
}

#header-nav-left,
#header-nav-right {
  padding-block: 1rem;
}

#header-nav-left {
  flex: 1;
}

.header {
  border-radius: 1rem;

  background-color: oklch(1 0 0);
}
</style>
