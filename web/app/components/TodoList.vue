<script setup lang="ts">
import type { Todo } from '../../types/Todo';

const { todos } = defineProps({
  todos: {
    type: Array as PropType<Todo[]>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: 'delete' | 'toggle', id: string): void;
}>();

function deleteTodo(id: string) {
  emit('delete', id);
}

function toggleTodo(id: string) {
  emit('toggle', id);
}
</script>

<template>
  <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <li v-for="todo in todos" :key="todo.id">
      <UCard variant="subtle">
        <template #header>
          <div class="flex justify-between">
            <span class="font-bold">
              {{ todo.title }}
            </span>
            <UButton variant="outline" @click="deleteTodo(todo.id)">X</UButton>
          </div>
        </template>

        {{ todo.description }}

        <template #footer>
          <UCheckbox
            :model-value="todo.completed"
            @change="toggleTodo(todo.id)"
          />
        </template>
      </UCard>
    </li>
  </ul>
</template>
