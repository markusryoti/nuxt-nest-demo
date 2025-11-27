export default defineEventHandler(async (event) => {
  setCookie(event, 'token', '', { path: '/', expires: new Date(0) });
});
