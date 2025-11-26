<script setup lang="ts">
const { data: todos, refresh } = await useFetch("/api/todos");

async function handleSubmit(todo: {
  title: string;
  description: string;
  completed: boolean;
}) {
  const res = await $fetch("/api/todos", {
    method: "POST",
    body: todo,
  });

  console.log(res);

  refresh();
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-red-500">Todo Dashboard</h1>
    <TodoForm @submit="handleSubmit" />
    <ul v-if="todos">
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.title }}
      </li>
    </ul>
    <div v-else>No todos found.</div>
  </div>
</template>
