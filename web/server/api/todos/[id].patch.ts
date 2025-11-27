import type { paths } from '../../../backend-types/api';

type PatchRequest =
  paths['/todos/{id}']['patch']['requestBody']['content']['application/json'];

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const token = getCookie(event, 'token');
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const { title, description, completed } = await readBody(event);
  if (!title && !description && completed === undefined) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    });
  }

  const payload: PatchRequest = {
    title,
    description,
    completed,
  };

  const ApiBase = process.env.VITE_PUBLIC_API_URL;
  const res = await $fetch.raw(`${ApiBase}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    body: payload,
  });

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      statusMessage: res.statusText,
    });
  }
});
