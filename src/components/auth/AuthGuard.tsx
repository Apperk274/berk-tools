/**
 * Authentication guard component
 * Protects routes by checking authentication status
 */

import { type ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import LoadingSpinner from '../ui/LoadingSpinner'

interface AuthGuardProps {
  children: ReactNode
}

/**
 * Wrapper component that protects routes requiring authentication
 * Redirects to login page if user is not authenticated
 */
export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { replace: true })
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="tw:h-screen tw:flex tw:items-center tw:justify-center tw:bg-gradient-to-b tw:from-gray-900 tw:via-gray-800 tw:to-gray-900">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
