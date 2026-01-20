import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getCurrentUser, logout } from '../services/authService'
import Button from '../components/ui/Button'

// Sample app data - 3x3 grid (9 apps)
const apps = [
  { id: 1, name: 'EtymoDictionary', icon: '📖', color: 'tw:bg-blue-600', isEmpty: false, path: '/etymodictionary' },
  { id: 2, name: '', icon: '', color: 'tw:bg-gray-700 tw:opacity-30', isEmpty: true },
  { id: 3, name: '', icon: '', color: 'tw:bg-gray-700 tw:opacity-30', isEmpty: true },
  { id: 4, name: '', icon: '', color: 'tw:bg-gray-700 tw:opacity-30', isEmpty: true },
  { id: 5, name: '', icon: '', color: 'tw:bg-gray-700 tw:opacity-30', isEmpty: true },
  { id: 6, name: '', icon: '', color: 'tw:bg-gray-700 tw:opacity-30', isEmpty: true },
  { id: 7, name: '', icon: '', color: 'tw:bg-gray-700 tw:opacity-30', isEmpty: true },
  { id: 8, name: '', icon: '', color: 'tw:bg-gray-700 tw:opacity-30', isEmpty: true },
  { id: 9, name: '', icon: '', color: 'tw:bg-gray-700 tw:opacity-30', isEmpty: true },
]

export default function Home() {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    setUsername(getCurrentUser())
  }, [])

  const handleLogout = () => {
    logout()
    setUsername(null)
    // Optionally reload the page to clear any cached data
    window.location.reload()
  }

  return (
    <div className="tw:min-h-screen tw:bg-gradient-to-b tw:from-gray-900 tw:via-gray-800 tw:to-gray-900 tw:flex tw:flex-col tw:items-center tw:justify-center tw:p-4">
      {/* User info and logout button */}
      {username && (
        <div className="tw:absolute tw:top-4 tw:right-4 tw:flex tw:items-center tw:gap-3">
          <span className="tw:text-white tw:text-sm">
            Logged in as: <span className="tw:font-semibold tw:text-blue-400">{username}</span>
          </span>
          <Button
            onClick={handleLogout}
            variant="secondary"
            className="tw:py-2 tw:px-4 tw:text-sm"
          >
            Logout
          </Button>
        </div>
      )}

      {/* Title */}
      <div className="tw:text-center">
        <h1 className="tw:text-5xl tw:font-bold tw:text-white tw:mb-2 tw:tracking-tight">
          <span className="tw:bg-gradient-to-r tw:from-blue-400 tw:via-purple-500 tw:to-pink-500 tw:bg-clip-text tw:text-transparent">
            Berk Tools
          </span>
        </h1>
        <div className="tw:h-1 tw:w-24 tw:bg-gradient-to-r tw:from-blue-500 tw:via-purple-500 tw:to-pink-500 tw:mx-auto tw:rounded-full"></div>
      </div>

      <div className="tw:w-full tw:max-w-md tw:flex tw:justify-center tw:mt-16">
        {/* App grid - 3x3 centered */}
        <div className="tw:grid tw:grid-cols-3 tw:gap-6 tw:auto-rows-fr tw:my-10">
          {apps.map((app) => (
            <div
              key={app.id}
              onClick={() => !app.isEmpty && app.path && navigate(app.path)}
              className={`tw:flex tw:flex-col tw:items-center tw:justify-center tw:transition-transform ${app.isEmpty ? '' : 'tw:cursor-pointer tw:active:scale-95'}`}
            >
              <div className={`tw:w-16 tw:h-16 ${app.color} tw:rounded-2xl tw:flex tw:items-center tw:justify-center tw:text-3xl tw:shadow-lg tw:mb-1 ${app.isEmpty ? 'tw:border-2 tw:border-gray-600 tw:border-dashed' : ''}`}>
                {app.icon}
              </div>
              {app.name && (
                <span className="tw:text-xs tw:text-white tw:text-center tw:font-medium tw:mt-1">
                  {app.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
