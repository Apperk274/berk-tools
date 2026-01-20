import { ReactNode } from 'react'
import LoadingSpinner from './LoadingSpinner'

interface ButtonProps {
  children?: ReactNode
  onClick?: () => void
  disabled?: boolean
  isLoading?: boolean
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
  type?: 'button' | 'submit' | 'reset'
  className?: string
  icon?: ReactNode
}

const variantClasses = {
  primary: 'tw:bg-gradient-to-r tw:from-blue-500 tw:to-blue-600 tw:shadow-blue-500/30 hover:tw:shadow-blue-500/40',
  secondary: 'tw:bg-gray-800/80 tw:backdrop-blur-sm tw:border tw:border-gray-700/50 hover:tw:bg-gray-700/80 hover:tw:border-gray-600',
  danger: 'tw:bg-gradient-to-r tw:from-red-500 tw:to-red-600 tw:shadow-red-500/30 hover:tw:shadow-red-500/40',
  success: 'tw:bg-gradient-to-r tw:from-green-500 tw:to-green-600 tw:shadow-green-500/30 hover:tw:shadow-green-500/40'
}

export default function Button({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  variant = 'primary',
  type = 'button',
  className = '',
  icon
}: ButtonProps) {
  const isDisabled = disabled || isLoading

  const baseClasses = 'tw:px-6 tw:py-3 tw:rounded-xl tw:font-semibold tw:text-base tw:transition-all tw:duration-200 tw:flex tw:items-center tw:justify-center tw:gap-2 tw:active:scale-95 tw:shadow-md hover:tw:shadow-xl hover:tw:scale-[1.02] disabled:tw:opacity-50 disabled:tw:cursor-not-allowed disabled:hover:tw:scale-100'
  
  const variantClass = variantClasses[variant]
  const textColorClass = variant === 'secondary' ? 'tw:text-white' : 'tw:text-white'

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${variantClass} ${textColorClass} ${className}`}
    >
      {isLoading ? (
        <LoadingSpinner size="sm" className="tw:border-white/30 tw:border-t-white" />
      ) : icon ? (
        <span>{icon}</span>
      ) : null}
      {children}
    </button>
  )
}
