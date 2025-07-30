import crypto from "node:crypto";

export function hashUserPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedBuffer = crypto.scryptSync(password, salt, 64);
  const hashedPassword = hashedBuffer.toString("hex");
  return `${hashedPassword}:${salt}`;
}

export function verifyPassword(storedPassword, suppliedPassword) {
  if (!storedPassword || !storedPassword.includes(":")) {
    return false;
  }
  const [hashedPassword, salt] = storedPassword.split(":");
  if (!hashedPassword || !salt) {
    return false;
  }
  const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
  const suppliedPasswordBuf = crypto.scryptSync(suppliedPassword, salt, 64);
  return crypto.timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
}
