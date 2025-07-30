import { cookies } from "next/headers";

const { BetterSqlite3Adapter } = require("@lucia-auth/adapter-sqlite");
const { Lucia } = require("lucia");
const { default: db } = require("./db");

const adapter = new BetterSqlite3Adapter(db, {
  user: "users",
  session: "sessions",
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

async function setSessionCookie(cookie) {
  const { name, value, attributes } = cookie;
  (await cookies()).set(name, value, attributes);
}

export async function createAuthSession(userId) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  await setSessionCookie(sessionCookie);
}

export async function verifyAuth() {
  const sessionCookie = (await cookies()).get(lucia.sessionCookieName);

  if (!sessionCookie || !sessionCookie.value) {
    return { user: null, session: null };
  }

  const result = await lucia.validateSession(sessionCookie.value);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      await setSessionCookie(sessionCookie);
    }
    if (!result.session) {
      const blankCookie = lucia.createBlankblankCookie();
      await setSessionCookie(blankCookie);
    }
  } catch {}
  return result;
}

export async function destroySession() {
  const { session } = await verifyAuth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  const blankCookie = lucia.createBlankSessionCookie();
  await setSessionCookie(blankCookie);
  await lucia.invalidateSession(session.id);

  return { success: true };
}
