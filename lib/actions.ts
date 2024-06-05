"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function authenticate(_currentState: unknown, formData: FormData) {
  // Hardcoded "fake" business login authentication server action
  try {
    await login(formData);
  } catch (error) {
    return "Invalid credentials.";
  }

  redirect("/dashboard");
}

export async function login(formData: FormData) {
  const id = formData.get("identifier");
  const password = formData.get("password");
  if (id != "acmecorp" || password != "1234") {
    throw new Error();
  }

  // NOTE: Faking auth, unencrypted session cookie is a security risk
  cookies().set("session", id, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  });
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}
