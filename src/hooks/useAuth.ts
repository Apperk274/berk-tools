/**
 * Authentication hook for fetching and managing user data
 */

import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { User } from '../types/auth'
import { getToken, clearToken } from '../services/authService'
import { getMeApi } from '../services/auth'

interface UseAuthReturn {
  user: User | null
  loading: boolean
  error: string | null
  refetch: () => void
}

/**
 * Custom hook for authentication state
 * Fetches user data from /auth/me endpoint
 * Handles token validation and redirects on auth failure
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const fetchUser = useCallback(async () => {
    const token = getToken()
    
    if (!token) {
      setLoading(false)
      setUser(null)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const userData = await getMeApi(token)
      setUser(userData)
    } catch (err) {
      console.error('Failed to fetch user:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch user')
      
      // Clear token and redirect to login on auth failure
      if (err instanceof Error && err.message.includes('Authentication failed')) {
        clearToken()
        setUser(null)
        navigate('/login')
      }
    } finally {
      setLoading(false)
    }
  }, [navigate])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return { user, loading, error, refetch: fetchUser }
}
