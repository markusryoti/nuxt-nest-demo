import type { paths } from '../../../backend-types/api';

type Claims =
  paths['/auth/profile']['get']['responses']['200']['content']['application/json'];

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const token = cookies['token'];
  if (!token) {
    return sendRedirect(event, '/login');
  }

  const ApiUrl = process.env.VITE_PUBLIC_API_URL;
  const user = await $fetch<Claims>(`${ApiUrl}/auth/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return user;
});
