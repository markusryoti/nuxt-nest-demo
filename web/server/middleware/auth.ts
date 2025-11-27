export default defineEventHandler((event) => {
  const url = getRequestURL(event);

  if (!url.pathname.startsWith('/dashboard')) {
    return;
  }

  const token = getCookie(event, 'token');
  if (!token) {
    console.log('No token found in server middleware');
    return sendRedirect(event, '/login');
  }
});
