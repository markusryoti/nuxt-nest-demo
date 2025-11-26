import type { paths } from "../../../backend-types/api";

type RequestPayload =
  paths["/auth/login"]["post"]["requestBody"]["content"]["application/json"];

type LoginResponse =
  paths["/auth/login"]["post"]["responses"]["200"]["content"]["application/json"];

export default defineEventHandler(async (event) => {
  const ApiUrl = process.env.VITE_PUBLIC_API_URL;

  const body = await readBody(event);
  const { email, password } = body;

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email and password are required",
    });
  }

  const payload: RequestPayload = {
    email,
    password,
  };

  const res = await $fetch<LoginResponse>(`${ApiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  });

  setCookie(event, "token", res.access_token, {
    maxAge: 60 * 10, // 10 minutes
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
  });

  return res;
});
