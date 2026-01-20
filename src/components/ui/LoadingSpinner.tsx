interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'tw:w-4 tw:h-4 tw:border-2',
  md: 'tw:w-5 tw:h-5 tw:border-2',
  lg: 'tw:w-6 tw:h-6 tw:border-3'
}

export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  return (
    <div className={`${sizeClasses[size]} tw:border-blue-500/30 tw:border-t-blue-500 tw:rounded-full tw:animate-spin ${className}`}></div>
  )
}
