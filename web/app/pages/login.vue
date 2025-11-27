<script setup lang="ts">
import * as z from 'zod';
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui';

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
  },
];

const schema = z.object({
  email: z.email('Invalid email'),
  password: z
    .string('Password is required')
    .min(6, 'Must be at least 6 characters'),
});

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: payload.data.email, password: payload.data.password },
    });
    console.log(response);
    navigateTo('/dashboard');
  } catch (error) {
    console.error(error);
  }
}
</script>

<script setup lang="ts"></script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="Login"
        description="Enter your credentials to access your account."
        icon="i-lucide-user"
        :fields="fields"
        @submit="onSubmit"
      />
    </UPageCard>
  </div>
</template>
