export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const token = getCookie(event, 'token');
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const ApiBase = process.env.VITE_PUBLIC_API_URL;
  const res = await $fetch.raw(`${ApiBase}/todos/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      statusMessage: res.statusText,
    });
  }
});
