import { useState, useMemo } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import WordDetails from './WordDetails'
import type { WordData } from '../../types/word'
import type { SavedLemma } from '../../types/api'
import { searchWord as searchWordApi } from '../../services/etymodictionary'

interface SearchTabProps {
  onSave: (wordData: WordData) => Promise<void>
  isSaving: boolean
  savedWords: SavedLemma[]
}

export default function SearchTab({ onSave, isSaving, savedWords }: SearchTabProps) {
  const [searchInput, setSearchInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentResult, setCurrentResult] = useState<WordData | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Check if current result is already saved
  const isAlreadySaved = useMemo(() => {
    if (!currentResult) return false
    if (!Array.isArray(savedWords)) return false
    return savedWords.some(saved => saved.lemma.toLowerCase() === currentResult.word.toLowerCase())
  }, [currentResult, savedWords])

  const handleSearchWord = async (word: string) => {
    setIsLoading(true)
    setCurrentResult(null)
    setError(null)

    try {
      const result = await searchWordApi(word)
      setCurrentResult(result)
    } catch (e) {
      console.error('Failed to search word:', e)
      setError('Failed to search word. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    if (searchInput.trim()) {
      handleSearchWord(searchInput.trim())
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSearch()
    }
  }

  const handleSave = async () => {
    if (currentResult) {
      await onSave(currentResult)
    }
  }

  return (
    <div className="tw:flex tw:flex-col tw:h-full tw:overflow-hidden">
      {/* Search Input - Fixed */}
      <div className="tw:shrink-0 tw:mb-4">
        <div className="tw:flex tw:gap-0 tw:border tw:border-gray-700/50 tw:rounded-lg tw:overflow-hidden">
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a word to search..."
            disabled={isLoading}
            isLoading={isLoading}
            className="tw:rounded-l-lg tw:rounded-r-none tw:border-r-0"
          />
          <Button
            onClick={handleSearch}
            disabled={isLoading || !searchInput.trim()}
            isLoading={isLoading}
            variant="primary"
            className="tw:px-10 tw:min-w-[120px] tw:rounded-l-none tw:shadow-none"
          >
            {isLoading ? 'Searching' : 'Send'}
          </Button>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="tw:flex-1 tw:overflow-y-auto tw:overflow-x-hidden">
        {/* Error State */}
        {error && (
          <div className="tw:text-center tw:py-8">
            <div className="tw:text-red-400">{error}</div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="tw:text-center tw:py-8">
            <div className="tw:text-gray-400">Searching...</div>
          </div>
        )}

        {/* Result Display */}
        {currentResult && !isLoading && (
          <div className="tw:bg-gray-800 tw:rounded-lg tw:p-6 tw:border tw:border-gray-700">
            <div className="tw:mb-4 tw:flex tw:items-center tw:justify-between">
              <h2 className="tw:text-2xl tw:font-bold tw:text-white tw:capitalize">
                {currentResult.word}
              </h2>
              {isAlreadySaved ? (
                <Button
                  disabled={true}
                  variant="secondary"
                  className="tw:py-3 tw:px-5 tw:cursor-not-allowed"
                  icon={<span className="tw:text-xl">✓</span>}
                >
                  Saved
                </Button>
              ) : (
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  isLoading={isSaving}
                  variant="success"
                  className="tw:py-3 tw:px-5"
                  icon={<span className="tw:text-xl">💾</span>}
                />
              )}
            </div>

            <WordDetails wordData={currentResult} />
          </div>
        )}
      </div>
    </div>
  )
}
