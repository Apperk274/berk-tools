import { useState } from 'react'
import Input from '../ui/Input'
import WordCard from './WordCard'
import type { SavedLemma } from '../../types/api'

interface SavedWordsTabProps {
  savedWords: SavedLemma[]
  onDelete: (lemma: string) => Promise<void>
  isDeleting: string | null
}

export default function SavedWordsTab({ savedWords, onDelete, isDeleting }: SavedWordsTabProps) {
  const [searchInput, setSearchInput] = useState('')

  const filteredWords = savedWords.filter((savedLemma) => 
    savedLemma.lemma.toLowerCase().includes(searchInput.toLowerCase())
  )

  return (
    <div className="tw:flex tw:flex-col tw:h-full tw:overflow-hidden">
      {/* Search Bar - Fixed */}
      {savedWords.length > 0 && (
        <div className="tw:flex-shrink-0 tw:mb-4">
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search saved words..."
            className="tw:py-4 tw:px-7"
          />
        </div>
      )}
      
      {/* Scrollable List Area */}
      <div className="tw:flex-1 tw:overflow-y-auto tw:overflow-x-hidden">
        {savedWords.length === 0 ? (
          <div className="tw:text-center tw:py-12 tw:text-gray-400">
            No saved words yet. Search for words and save them to see them here.
          </div>
        ) : filteredWords.length === 0 ? (
          <div className="tw:text-center tw:py-12 tw:text-gray-400">
            No words found matching "{searchInput}"
          </div>
        ) : (
          <div className="tw:space-y-4">
            {filteredWords.map((savedLemma) => (
              <WordCard
                key={savedLemma.lemma}
                lemma={savedLemma.lemma}
                onDelete={onDelete}
                isDeleting={isDeleting === savedLemma.lemma}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
