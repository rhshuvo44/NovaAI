const COOKIE_NAME = "novaai-auth";
const COOKIE_PATH = "/";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function setAuthCookie(): void {
  document.cookie = `${COOKIE_NAME}=true;path=${COOKIE_PATH};max-age=${COOKIE_MAX_AGE};SameSite=Lax`;
}

export function clearAuthCookie(): void {
  document.cookie = `${COOKIE_NAME}=;path=${COOKIE_PATH};max-age=0;SameSite=Lax`;
}
