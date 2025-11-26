import type { paths } from "../../backend-types/api.d.ts";

type Todos =
  paths["/todos"]["get"]["responses"]["200"]["content"]["application/json"];

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const token = cookies.token;
  if (!token) {
    await sendRedirect(event, "/login");
  }

  const ApiUrl = process.env.VITE_PUBLIC_API_URL;
  const res = await $fetch<Todos>(`${ApiUrl}/todos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
});
