/**
 * Authentication-related type definitions
 */

export interface User {
  id: number
  username: string
  created_at: string
}

export interface SignInRequest {
  username: string
  password: string
}

export interface SignInResponse {
  token: string
}
