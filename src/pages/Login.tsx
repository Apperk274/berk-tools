/**
 * Login page component
 */

import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { signIn } from '../services/authService'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password')
      return
    }

    setIsLoading(true)
    setError(null)

    const result = await signIn(username, password)

    if (result.success) {
      // Redirect to home page on success
      navigate('/', { replace: true })
    } else {
      setError(result.error || 'Sign in failed')
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit(e as unknown as FormEvent)
    }
  }

  return (
    <div className="tw:min-h-screen tw:bg-linear-to-b tw:from-gray-900 tw:via-gray-800 tw:to-gray-900 tw:flex tw:flex-col tw:items-center tw:justify-center tw:p-4">
      {/* Title */}
      <div className="tw:text-center tw:mb-8">
        <h1 className="tw:text-5xl tw:font-bold tw:text-white tw:mb-2 tw:tracking-tight">
          <span className="tw:bg-linear-to-r tw:from-blue-400 tw:via-purple-500 tw:to-pink-500 tw:bg-clip-text tw:text-transparent">
            Berk Tools
          </span>
        </h1>
        <div className="tw:h-1 tw:w-24 tw:bg-linear-to-r tw:from-blue-500 tw:via-purple-500 tw:to-pink-500 tw:mx-auto tw:rounded-full"></div>
      </div>

      {/* Login Card */}
      <div className="tw:w-full tw:max-w-md">
        <div className="tw:bg-gray-800/80 tw:backdrop-blur-sm tw:rounded-2xl tw:border-2 tw:border-gray-700/50 tw:shadow-2xl tw:p-8">
          <h2 className="tw:text-2xl tw:font-bold tw:text-white tw:mb-6 tw:text-center">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="tw:space-y-4">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="tw:block tw:text-sm tw:font-medium tw:text-gray-300 tw:mb-2">
                Username
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your username"
                disabled={isLoading}
                className="tw:w-full"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="tw:block tw:text-sm tw:font-medium tw:text-gray-300 tw:mb-2">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your password"
                disabled={isLoading}
                className="tw:w-full"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="tw:bg-red-500/10 tw:border tw:border-red-500/50 tw:rounded-lg tw:p-3">
                <p className="tw:text-red-400 tw:text-sm tw:text-center">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              variant="primary"
              className="tw:w-full tw:py-4 tw:mt-6"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
