<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const { data: todos, refresh } = await useFetch('/api/todos');

async function handleSubmit(todo: {
  title: string;
  description: string;
  completed: boolean;
}) {
  await $fetch('/api/todos', {
    method: 'POST',
    body: todo,
  });

  refresh();
}

async function handleTodoDelete(id: string) {
  await $fetch(`/api/todos/${id}`, {
    method: 'DELETE',
  });

  refresh();
}

async function handleTodoToggle(id: string) {
  const todo = todos.value?.find((t) => t.id === id);
  if (!todo) return;

  await $fetch(`/api/todos/${id}`, {
    method: 'PATCH',
    body: { ...todo, completed: !todo.completed },
  });

  refresh();
}
</script>

<template>
  <div class="flex flex-col gap-8 pt-8">
    <div class="flex flex-col items-center gap-4">
      <TodoForm @submit="handleSubmit" />
    </div>
    <hr />
    <TodoList
      v-if="todos"
      :todos="todos"
      @delete="handleTodoDelete"
      @toggle="handleTodoToggle"
    />
    <div v-else>No todos found.</div>
  </div>
</template>
