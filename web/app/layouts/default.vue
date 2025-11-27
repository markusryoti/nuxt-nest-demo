<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/',
    active: route.path === '/',
  },
  {
    label: 'Dashboard',
    to: '/dashboard',
    active: route.path.startsWith('/dashboard'),
  },
  {
    label: 'About',
    to: '/about',
    active: route.path.startsWith('/about'),
  },
]);

async function logout() {
  await $fetch('/api/auth/logout');
  navigateTo('/login');
}
</script>

<template>
  <div>
    <UHeader>
      <template #title>
        <span class="h-6">Nuxt Todo</span>
      </template>

      <UNavigationMenu :items="items" />

      <template #right>
        <UColorModeButton />
        <UButton
          icon="lucide:log-out"
          color="neutral"
          variant="ghost"
          @click="logout"
        >
          Logout
        </UButton>
      </template>
    </UHeader>
    <UContainer>
      <div>
        <slot />
      </div>
    </UContainer>

    <UFooter>
      <template #left>
        <p class="text-muted text-sm">
          Copyright © {{ new Date().getFullYear() }}
        </p>
      </template>

      <UNavigationMenu :items="items" variant="link" />

      <template #right>
        <UButton
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          to="https://github.com/nuxt/nuxt"
          target="_blank"
          aria-label="GitHub"
        />
      </template>
    </UFooter>
  </div>
</template>
