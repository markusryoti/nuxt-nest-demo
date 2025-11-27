<script setup lang="ts">
import * as z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';

const emit = defineEmits<{
  (
    e: 'submit',
    payload: { title: string; description: string; completed: boolean }
  ): void;
}>();

const schema = z.object({
  title: z.string('Title is required'),
  description: z.string('Description is required'),
  completed: z.boolean(),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  title: undefined,
  description: undefined,
  completed: false,
});

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: 'Success',
    description: 'The form has been submitted.',
    color: 'success',
  });

  emit('submit', {
    title: event.data.title,
    description: event.data.description,
    completed: event.data.completed,
  });

  state.title = '';
  state.description = '';
  state.completed = false;
}
</script>

<template>
  <UCard variant="soft" class="max-w-2xl">
    <template #header>
      <h2 class="text-lg font-bold">Add Todo</h2>
    </template>

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Title" name="title">
        <UInput v-model="state.title" class="w-xl" />
      </UFormField>

      <UFormField label="Description" name="description">
        <!-- <UInput v-model="state.description" class="w-xl" />  -->
        <UTextarea v-model="state.description" class="w-xl" />
      </UFormField>

      <div>
        <UCheckbox v-model="state.completed" label="Completed" />
      </div>

      <UButton type="submit">Submit</UButton>
    </UForm>
  </UCard>
</template>
