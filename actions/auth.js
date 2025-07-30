"use server";

import { createAuthSession, destroySession } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserbyEmail } from "@/lib/user";
import { validateSignupInput, AUTH_ERRORS } from "@/lib/validation";
import { redirect } from "next/navigation";

export async function signup(prevState, formData) {
  const email = formData.get("email")?.trim() || "";
  const password = formData.get("password") || "";

  const errors = validateSignupInput(email, password);

  if (Object.keys(errors).length) {
    return { errors };
  }

  const hashedPassword = hashUserPassword(password);

  try {
    const userId = await createUser(email, hashedPassword);
    await createAuthSession(userId);
    redirect("/training");
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return { errors: { email: AUTH_ERRORS.emailExists } };
    }
    throw error;
  }
}

export async function login(prevState, formData) {
  const email = formData.get("email")?.trim();
  const password = formData.get("password");

  const existingUser = await getUserbyEmail(email);

  if (!existingUser || !verifyPassword(existingUser.password, password)) {
    return {
      errors: {
        authentication: AUTH_ERRORS.genericAuth,
      },
    };
  }

  await createAuthSession(existingUser.id);
  redirect("/training");
}

export async function auth(mode, prevState, formData) {
  if (mode === "login") return login(prevState, formData);
  return signup(prevState, formData);
}

export async function logout() {
  await destroySession();
  redirect("/");
}
