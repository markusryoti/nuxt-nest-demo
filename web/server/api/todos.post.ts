import type { paths } from "../../backend-types/api.d.ts";

type Todo =
  paths["/todos"]["post"]["responses"]["201"]["content"]["application/json"];

export type TodoRequest =
  paths["/todos"]["post"]["requestBody"]["content"]["application/json"];

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const token = cookies.token;
  if (!token) {
    await sendRedirect(event, "/login");
  }

  const body = await readBody(event);

  if (!body.title || !body.description || !body.completed) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields",
    });
  }

  const payload: TodoRequest = {
    title: body.title,
    description: body.description,
    completed: body.completed,
  };

  const ApiUrl = process.env.VITE_PUBLIC_API_URL;
  const res = await $fetch<Todo>(`${ApiUrl}/todos`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: payload,
  });

  return res;
});
