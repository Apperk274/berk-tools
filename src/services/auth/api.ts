/**
 * Authentication API client
 */

import axios from 'axios'
import { config } from '../../config'
import type { SignInRequest, SignInResponse, User } from '../../types/auth'

/**
 * Sign in with username and password
 * @param username - User's username
 * @param password - User's password
 * @returns Promise resolving to SignInResponse with token
 */
export async function signInApi(username: string, password: string): Promise<SignInResponse> {
  try {
    const response = await axios.post<SignInResponse>(
      `${config.BACKEND_URL}/auth/sign-in`,
      { username, password } as SignInRequest
    )
    return response.data
  } catch (error) {
    console.error('Error signing in:', error)
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid username or password')
      }
      throw new Error(`Sign in failed: ${error.message}`)
    }
    
    throw error
  }
}

/**
 * Get current user information
 * @param token - JWT bearer token
 * @returns Promise resolving to User object
 */
export async function getMeApi(token: string): Promise<User> {
  try {
    const response = await axios.get<User>(
      `${config.BACKEND_URL}/auth/me`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error fetching user:', error)
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Authentication failed')
      }
      throw new Error(`Failed to fetch user: ${error.message}`)
    }
    
    throw error
  }
}
