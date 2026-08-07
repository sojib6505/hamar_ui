// POST /api/auth/login, POST /api/auth/register
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms))

export async function login(credentials) {
  await delay()
  // Later: POST /api/auth/login
  return { success: true, user: { name: 'Demo User', email: credentials.email } }
}
export async function register(payload) {
  await delay()
  // Later: POST /api/auth/register
  return { success: true, user: { name: payload.name, email: payload.email } }
}
