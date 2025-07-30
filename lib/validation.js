// lib/validation.js

export const AUTH_ERRORS = {
  genericAuth: "Could not authenticate user, please check your credentials.",
  emailExists: "An account with this email already exists.",
  emailRequired: "Email is required.",
  passwordRequired: "Password is required.",
  invalidEmail: "Please enter a valid email address.",
  passwordTooShort: "Password must be at least 8 characters long.",
};

export function validateEmail(email) {
  if (!email) return AUTH_ERRORS.emailRequired;
  if (!email.includes("@")) return AUTH_ERRORS.invalidEmail;
  return null;
}

export function validatePasswordForSignup(password) {
  if (!password) return AUTH_ERRORS.passwordRequired;
  if (password.length < 8) return AUTH_ERRORS.passwordTooShort;
  return null;
}

export function validateSignupInput(email, password) {
  const errors = {};
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  const passwordError = validatePasswordForSignup(password);
  if (passwordError) errors.password = passwordError;
  return errors;
}
