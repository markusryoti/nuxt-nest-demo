<script setup lang="ts">
const email = ref("");
const password = ref("");

const login = async () => {
  try {
    const response = await $fetch("/api/auth/login", {
      method: "POST",
      body: { email: email.value, password: password.value },
    });
    console.log(response);
    navigateTo("/dashboard");
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <h1>Login</h1>
  <form @submit.prevent="login">
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <button type="submit">Login</button>
  </form>
</template>
