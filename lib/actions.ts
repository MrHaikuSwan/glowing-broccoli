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
  const foreignEntId = "mer_c509ca41-2726-4594-a5f4-4429c64977a9";
  const foreignUserId = formData.get("userId")!.toString();
  const mercoa = new MercoaClient({ token: process.env.API_KEY! });

  let entId;
  try {
    const response = await mercoa.entity.find({
      isCustomer: true,
      foreignId: foreignEntId,
    });
    entId = response.data[0].id;
  } catch (e) {
    return "Failed to find business entity.";
  }

  // NOTE: Looks like user search for anything besides foreignIds is broken?
  let userId;
  try {
    const response = await mercoa.entity.user.find(entId, {
      foreignId: foreignUserId,
    });
    console.log(response);
    userId = response.data[0].id;
  } catch (e) {
    return "Failed to find user within business entity.";
  }

  redirect(`/dashboard?entId=${entId}&userId=${userId}`);
}

export async function login(formData: FormData) {
  const formId = formData.get("identifier")!.toString();
  const formPassword = formData.get("password")!.toString();
  if (formId !== "acmecorp" || formPassword !== "1234") {
    throw new Error();
  }

  // NOTE: Faking auth, unencrypted session cookie is a security risk
  cookies().set("session", formId, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  });
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getEntityStatus(entId: string) {
  const mercoa = new MercoaClient({ token: process.env.API_KEY! });
  try {
    const res = await mercoa.entity.get(entId);
    return res.status;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
