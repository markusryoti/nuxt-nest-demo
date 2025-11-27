<script setup lang="ts">
const links = ref([
  {
    label: 'Get started',
    to: '/dashboard',
    icon: 'i-lucide-pencil',
  },
  {
    label: 'Learn more',
    to: '/about',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right',
  },
]);
</script>

<template>
  <UPageHero
    title="Ultimate Vue Todo List"
    description="A Nuxt/Vue application with a Nest.js backend providing an incredible and modern todo list experience."
    headline="New release"
    orientation="horizontal"
    :links="links"
  >
    <img
      src="/assets/img/notes.jpg"
      alt="App screenshot"
      class="rounded-lg shadow-2xl ring ring-default"
    />
  </UPageHero>
</template>
