/**
 * Authentication service using Basic Auth
 */

interface AuthCredentials {
  username: string
  password: string
}

const AUTH_STORAGE_KEY = 'auth-credentials'

/**
 * Get stored credentials from localStorage
 */
export function getStoredCredentials(): AuthCredentials | null {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Failed to load credentials:', e)
  }
  return null
}

/**
 * Store credentials in localStorage
 */
export function storeCredentials(credentials: AuthCredentials): void {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(credentials))
  } catch (e) {
    console.error('Failed to store credentials:', e)
  }
}

/**
 * Clear stored credentials
 */
export function clearCredentials(): void {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  } catch (e) {
    console.error('Failed to clear credentials:', e)
  }
}

/**
 * Prompt user for credentials using browser's built-in prompt
 */
export function promptForCredentials(): AuthCredentials | null {
  const username = prompt('Please enter your username:')
  if (!username) return null
  
  const password = prompt('Please enter your password:')
  if (!password) return null
  
  return { username, password }
}

/**
 * Get current authenticated user
 */
export function getCurrentUser(): string | null {
  const credentials = getStoredCredentials()
  return credentials ? credentials.username : null
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getStoredCredentials() !== null
}

/**
 * Login - prompt for credentials and store them
 */
export function login(): boolean {
  const credentials = promptForCredentials()
  if (credentials) {
    storeCredentials(credentials)
    return true
  }
  return false
}

/**
 * Logout - clear stored credentials
 */
export function logout(): void {
  clearCredentials()
}

/**
 * Get Authorization header value for Basic Auth
 */
export function getAuthHeader(): string | null {
  const credentials = getStoredCredentials()
  if (!credentials) return null
  
  const encoded = btoa(`${credentials.username}:${credentials.password}`)
  return `Basic ${encoded}`
}
