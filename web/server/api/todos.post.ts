import type { paths } from '../../backend-types/api.d';
import type { Todo } from '../../types/Todo';

export type TodoRequest =
  paths['/todos']['post']['requestBody']['content']['application/json'];

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token');

  const body = await readBody(event);

  if (!body.title || !body.description) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    });
  }

  const payload: TodoRequest = {
    title: body.title,
    description: body.description,
    completed: body.completed,
  };

  const ApiUrl = process.env.VITE_PUBLIC_API_URL;
  const res = await $fetch<Todo>(`${ApiUrl}/todos`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: payload,
  });

  return res;
});
