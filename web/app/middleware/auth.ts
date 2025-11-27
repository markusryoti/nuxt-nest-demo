export default defineNuxtRouteMiddleware(async (_to, _from) => {
  if (import.meta.server) {
    return;
  }

  const token = await $fetch('/api/auth/session');
  if (!token) {
    console.log('No token found in client middleware');
    return navigateTo('/login');
  }

  console.log('Token found in client middleware');
});
