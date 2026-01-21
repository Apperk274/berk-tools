import { useState, useEffect } from 'react'
import Button from '../ui/Button'
import WordDetails from './WordDetails'
import type { WordData } from '../../types/word'
import { loadLemmaDetails } from '../../services/etymodictionary'

interface WordCardProps {
  lemma: string
  onDelete: (lemma: string) => void
  isDeleting: boolean
}

export default function WordCard({ lemma, onDelete, isDeleting }: WordCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [wordData, setWordData] = useState<WordData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch details when expanded
  useEffect(() => {
    if (isExpanded && !wordData && !isLoading) {
      const fetchDetails = async () => {
        setIsLoading(true)
        setError(null)
        try {
          const details = await loadLemmaDetails(lemma)
          setWordData(details)
        } catch (e) {
          console.error('Failed to load lemma details:', e)
          setError('Failed to load word details')
        } finally {
          setIsLoading(false)
        }
      }
      fetchDetails()
    }
  }, [isExpanded, wordData, isLoading, lemma])

  return (
    <div className="tw:bg-gray-700/80 tw:backdrop-blur-sm tw:rounded-xl tw:border-2 tw:border-gray-600/50 tw:overflow-hidden tw:shadow-lg tw:hover:shadow-xl tw:hover:border-gray-500 tw:transition-all tw:duration-200 tw:my-2">
      <div className="tw:flex tw:items-center tw:justify-between tw:py-5 tw:px-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="tw:flex-1 tw:text-left tw:hover:opacity-80 tw:transition-opacity"
        >
          <h3 className="tw:text-xl tw:font-bold tw:text-white tw:capitalize">
            {lemma}
          </h3>
        </button>
        <Button
          onClick={() => onDelete(lemma)}
          disabled={isDeleting}
          isLoading={isDeleting}
          variant="danger"
          className="tw:ml-4 tw:py-3 tw:px-4"
          icon={<span className="tw:text-xl">🗑️</span>}
        />
      </div>

      {isExpanded && (
        <div className="tw:border-t-2 tw:border-gray-600/50 tw:bg-gray-800/60 tw:py-6 tw:px-6">
          {isLoading && (
            <div className="tw:text-center tw:py-4 tw:text-gray-400">
              Loading details...
            </div>
          )}
          {error && (
            <div className="tw:text-center tw:py-4 tw:text-red-400">
              {error}
            </div>
          )}
          {wordData && !isLoading && (
            <WordDetails wordData={wordData} headingSize="md" />
          )}
        </div>
      )}
    </div>
  )
}
