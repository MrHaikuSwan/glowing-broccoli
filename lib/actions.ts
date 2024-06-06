"use server";

import { MercoaClient } from "@mercoa/javascript";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    await login(formData);
  } catch (error) {
    return "Invalid credentials.";
  }

  // NOTE: Hardcoded
  // Fake retrieval of identifier's foreignId from DB
  const foreignId = "mer_c509ca41-2726-4594-a5f4-4429c64977a9";

  // TODO: Improve error handling
  const mercoa = new MercoaClient({ token: process.env.API_KEY! });
  let entId;
  try {
    const response = await mercoa.entity.find({
      isCustomer: true,
      foreignId,
    });
    entId = response.data[0].id;
  } catch (e) {
    return "Failed to find account; please try again.";
  }

  redirect(`/dashboard?entId=${entId}`);
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
