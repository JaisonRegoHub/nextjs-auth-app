"use client";

import { auth } from "@/actions/auth";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function AuthForm({ mode }) {
  const [formState, formAction] = useFormState(auth.bind(null, mode), {});

  const isLogin = mode === "login";

  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>

      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />
      </p>

      <p>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          minLength={8}
        />
      </p>

      {formState.errors && (
        <ul id="form-errors" role="alert">
          {Object.entries(formState.errors).map(([field, message]) => (
            <li key={field}>{message}</li>
          ))}
        </ul>
      )}

      <p>
        <button type="submit">{isLogin ? "Login" : "Create Account"}</button>
      </p>

      <p>
        {isLogin ? (
          <Link href="/?mode=signup">Create an account.</Link>
        ) : (
          <Link href="/?mode=login">Login with existing account.</Link>
        )}
      </p>
    </form>
  );
}
