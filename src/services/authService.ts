/**
 * Authentication service using JWT Bearer tokens
 */

import { signInApi } from './auth'

const AUTH_TOKEN_KEY = 'auth-token'

/**
 * Get stored JWT token from localStorage
 */
export function getToken(): string | null {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  } catch (e) {
    console.error('Failed to load token:', e)
    return null
  }
}

/**
 * Store JWT token in localStorage
 */
export function setToken(token: string): void {
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
  } catch (e) {
    console.error('Failed to store token:', e)
  }
}

/**
 * Clear stored JWT token
 */
export function clearToken(): void {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  } catch (e) {
    console.error('Failed to clear token:', e)
  }
}

/**
 * Get Authorization header value for Bearer token
 */
export function getAuthHeader(): string | null {
  const token = getToken()
  if (!token) return null
  
  return `Bearer ${token}`
}

/**
 * Check if user is authenticated (has a token)
 */
export function isAuthenticated(): boolean {
  return getToken() !== null
}

/**
 * Sign in with username and password
 * @param username - User's username
 * @param password - User's password
 * @returns Promise resolving to success boolean
 */
export async function signIn(username: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await signInApi(username, password)
    setToken(response.token)
    return { success: true }
  } catch (error) {
    console.error('Sign in failed:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Sign in failed'
    }
  }
}

/**
 * Sign out - clear token and reload page
 */
export function signOut(): void {
  clearToken()
  window.location.href = '/'
}
