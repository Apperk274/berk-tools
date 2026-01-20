import { useState } from 'react'
import Button from '../ui/Button'
import WordDetails, { type WordData } from './WordDetails'

interface WordCardProps {
  wordData: WordData
  onDelete: (word: string) => void
  isDeleting: boolean
}

export default function WordCard({ wordData, onDelete, isDeleting }: WordCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="tw:bg-gray-700/80 tw:backdrop-blur-sm tw:rounded-xl tw:border-2 tw:border-gray-600/50 tw:overflow-hidden tw:shadow-lg tw:hover:shadow-xl tw:hover:border-gray-500 tw:transition-all tw:duration-200 tw:my-2">
      <div className="tw:flex tw:items-center tw:justify-between tw:py-5 tw:px-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="tw:flex-1 tw:text-left tw:hover:opacity-80 tw:transition-opacity"
        >
          <h3 className="tw:text-xl tw:font-bold tw:text-white tw:capitalize">
            {wordData.word}
          </h3>
        </button>
        <Button
          onClick={() => onDelete(wordData.word)}
          disabled={isDeleting}
          isLoading={isDeleting}
          variant="danger"
          className="tw:ml-4 tw:py-3 tw:px-4"
          icon={<span className="tw:text-xl">🗑️</span>}
        />
      </div>

      {isExpanded && (
        <div className="tw:border-t-2 tw:border-gray-600/50 tw:bg-gray-800/60 tw:py-6 tw:px-6">
          <WordDetails wordData={wordData} headingSize="md" />
        </div>
      )}
    </div>
  )
}
