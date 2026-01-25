import LoadingSpinner from './LoadingSpinner'

interface InputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  placeholder?: string
  disabled?: boolean
  isLoading?: boolean
  className?: string
  type?: string
  autoCapitalize?: string
  autoCorrect?: string
  spellCheck?: boolean
}

export default function Input({
  value,
  onChange,
  onKeyPress,
  placeholder,
  disabled = false,
  isLoading = false,
  className = '',
  type = 'text',
  autoCapitalize = 'off',
  autoCorrect = 'off',
  spellCheck = false
}: InputProps) {
  return (
    <div className="tw:flex-1 tw:relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        disabled={disabled || isLoading}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        spellCheck={spellCheck}
        className={`tw:w-full tw:bg-gray-800/80 tw:backdrop-blur-sm tw:border tw:border-gray-700/50 tw:text-white tw:text-lg tw:placeholder-gray-400 tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-blue-500/50 tw:focus:border-blue-500/50 tw:shadow-lg tw:transition-all tw:duration-200 tw:disabled:opacity-60 tw:py-4 tw:px-7 tw:rounded-lg ${className}`.trim()}
      />
      {isLoading && (
        <div className="tw:absolute tw:right-4 tw:top-1/2 tw:-translate-y-1/2">
          <LoadingSpinner size="sm" />
        </div>
      )}
    </div>
  )
}
