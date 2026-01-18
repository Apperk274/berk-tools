import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface WordData {
  word: string
  definition: string
  exampleSentences: string[]
  turkishEquivalent: string
  etymology: string
  howToRemember: string
}

function EtymoDictionary() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'search' | 'saved'>('search')
  const [searchInput, setSearchInput] = useState('')
  const [savedWordsSearch, setSavedWordsSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [currentResult, setCurrentResult] = useState<WordData | null>(null)
  const [savedWords, setSavedWords] = useState<WordData[]>([])

  // Load saved words from API on mount
  useEffect(() => {
    const loadSavedWords = async () => {
      try {
        // Mock API call - replace with actual API endpoint
        await new Promise(resolve => setTimeout(resolve, 500))
        // Mock response - replace with actual API call
        // const response = await fetch('/api/saved-words')
        // const data = await response.json()
        // setSavedWords(data)
        
        // For now, keep empty array or load from localStorage as fallback
        const saved = localStorage.getItem('etymodictionary-words')
        if (saved) {
          try {
            setSavedWords(JSON.parse(saved))
          } catch (e) {
            console.error('Failed to load saved words:', e)
          }
        }
      } catch (e) {
        console.error('Failed to load saved words:', e)
      }
    }
    loadSavedWords()
  }, [])

  // Mock API call with delay
  const searchWord = async (word: string) => {
    setIsLoading(true)
    setCurrentResult(null)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Mock response
    const mockResult: WordData = {
      word: word.toLowerCase(),
      definition: `A definition for "${word}". This is a placeholder definition that will be replaced with actual API data.`,
      exampleSentences: [
        `Here's an example sentence using "${word}".`,
        `Another example: "${word}" can be used in various contexts.`
      ],
      turkishEquivalent: `Türkçe karşılığı: ${word}`,
      etymology: `The word "${word}" comes from... (etymology details will be provided by the API)`,
      howToRemember: `To remember "${word}", think about... (memory tip will be provided by the API)`
    }

    setCurrentResult(mockResult)
    setIsLoading(false)
  }

  const handleSearch = () => {
    if (searchInput.trim()) {
      searchWord(searchInput.trim())
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSearch()
    }
  }

  const handleSave = async () => {
    if (currentResult && !isSaving) {
      setIsSaving(true)
      try {
        // Mock API call - replace with actual API endpoint
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Replace with actual API call:
        // const response = await fetch('/api/saved-words', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(currentResult)
        // })
        // if (!response.ok) throw new Error('Failed to save word')
        
        const updated = [...savedWords, currentResult]
        setSavedWords(updated)
        alert('Word saved successfully!')
      } catch (e) {
        console.error('Failed to save word:', e)
        alert('Failed to save word. Please try again.')
      } finally {
        setIsSaving(false)
      }
    }
  }

  const handleDelete = async (word: string) => {
    if (isDeleting) return
    setIsDeleting(word)
    try {
      // Mock API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 600))
      
      // Replace with actual API call:
      // const response = await fetch(`/api/saved-words/${word}`, {
      //   method: 'DELETE'
      // })
      // if (!response.ok) throw new Error('Failed to delete word')
      
      const updated = savedWords.filter(w => w.word !== word)
      setSavedWords(updated)
    } catch (e) {
      console.error('Failed to delete word:', e)
      alert('Failed to delete word. Please try again.')
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className="tw:min-h-screen tw:bg-gradient-to-b tw:from-gray-900 tw:via-gray-800 tw:to-gray-900 tw:p-4">
      {/* Header */}
      <div className="tw:max-w-4xl tw:mx-auto tw:mb-6">
        <div className="tw:flex tw:items-center tw:gap-4 tw:mb-4">
          <button
            onClick={() => navigate('/')}
            style={{ paddingTop: '12px', paddingBottom: '12px', paddingLeft: '16px', paddingRight: '16px' }}
            className="tw:text-white tw:bg-gray-800/80 tw:backdrop-blur-sm tw:border tw:border-gray-700/50 tw:transition-all tw:flex tw:items-center tw:gap-2 tw:rounded-xl tw:hover:bg-gray-700/80 tw:hover:border-gray-600 tw:font-semibold tw:text-base tw:active:scale-95 tw:shadow-md"
          >
            <span className="tw:text-xl">←</span> Back to Home
          </button>
          <h1 className="tw:text-4xl tw:font-bold tw:text-white">
            <span className="tw:bg-gradient-to-r tw:from-blue-400 tw:via-purple-500 tw:to-pink-500 tw:bg-clip-text tw:text-transparent">
              EtymoDictionary
            </span>
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="tw:max-w-4xl tw:mx-auto">
        <div className="tw:bg-gray-800/50 tw:backdrop-blur-sm tw:p-3 tw:rounded-2xl tw:flex tw:gap-3 tw:shadow-lg tw:border tw:border-gray-700/50" style={{ marginTop: '12px', marginBottom: '12px' }}>
          <button
            onClick={() => setActiveTab('search')}
            style={{ paddingTop: '16px', paddingBottom: '16px' }}
            className={`tw:flex-1 tw:px-6 tw:rounded-xl tw:font-semibold tw:text-lg tw:transition-all tw:duration-200 tw:ease-out ${activeTab === 'search'
                ? 'tw:bg-gradient-to-r tw:from-blue-500 tw:to-blue-600 tw:text-white tw:shadow-md tw:shadow-blue-500/30 tw:scale-[1.02]'
                : 'tw:text-gray-400 tw:hover:text-gray-300 tw:hover:bg-gray-700/50'
              }`}
          >
            Look Up
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            style={{ paddingTop: '16px', paddingBottom: '16px' }}
            className={`tw:flex-1 tw:px-6 tw:rounded-xl tw:font-semibold tw:text-lg tw:transition-all tw:duration-200 tw:ease-out tw:relative ${activeTab === 'saved'
                ? 'tw:bg-gradient-to-r tw:from-blue-500 tw:to-blue-600 tw:text-white tw:shadow-md tw:shadow-blue-500/30 tw:scale-[1.02]'
                : 'tw:text-gray-400 tw:hover:text-gray-300 tw:hover:bg-gray-700/50'
              }`}
          >
            Saved
            {savedWords.length > 0 && (
              <span style={{ marginLeft: '16px', paddingLeft: '16px', paddingRight: '16px', paddingTop: '8px', paddingBottom: '8px' }} className="tw:bg-white/20 tw:rounded-full tw:text-sm tw:font-bold">
                {savedWords.length}
              </span>
            )}
          </button>
        </div>

        {/* Search Tab */}
        {activeTab === 'search' && (
          <div className="tw:space-y-4">
            {/* Search Input */}
            <div className="tw:flex" style={{ gap: '0px', borderWidth: '1px', borderColor: 'rgba(0, 0, 0, 1)', borderStyle: 'solid', borderImage: 'none' }}>
              <div className="tw:flex-1 tw:relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter a word to search..."
                  style={{ paddingTop: '16px', paddingBottom: '16px', paddingLeft: '28px', paddingRight: '28px' }}
                  className="tw:w-full tw:bg-gray-800/80 tw:backdrop-blur-sm tw:border tw:border-gray-700/50 tw:text-white tw:text-lg tw:placeholder-gray-400 tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-blue-500/50 tw:focus:border-blue-500/50 tw:shadow-lg tw:transition-all tw:duration-200 tw:disabled:opacity-60"
                  disabled={isLoading}
                />
                {isLoading && (
                  <div className="tw:absolute tw:right-4 tw:top-1/2 tw:-translate-y-1/2">
                    <div className="tw:w-5 tw:h-5 tw:border-2 tw:border-blue-500/30 tw:border-t-blue-500 tw:rounded-full tw:animate-spin"></div>
                  </div>
                )}
              </div>
              <button
                onClick={handleSearch}
                disabled={isLoading || !searchInput.trim()}
                style={{ paddingTop: '16px', paddingBottom: '16px' }}
                className="tw:px-10 tw:bg-gradient-to-r tw:from-blue-500 tw:to-blue-600 tw:text-white tw:font-semibold tw:text-lg tw:shadow-lg tw:shadow-blue-500/30 tw:hover:shadow-xl tw:hover:shadow-blue-500/40 tw:hover:scale-[1.02] tw:active:scale-[0.98] tw:disabled:opacity-50 tw:disabled:cursor-not-allowed tw:disabled:hover:scale-100 tw:transition-all tw:duration-200 tw:flex tw:items-center tw:justify-center tw:min-w-[120px]"
              >
                {isLoading ? (
                  <span className="tw:flex tw:items-center tw:gap-2">
                    <div className="tw:w-4 tw:h-4 tw:border-2 tw:border-white/30 tw:border-t-white tw:rounded-full tw:animate-spin"></div>
                    Searching
                  </span>
                ) : (
                  'Send'
                )}
              </button>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="tw:text-center tw:py-8">
                <div className="tw:text-gray-400">Searching...</div>
              </div>
            )}

            {/* Result Display */}
            {currentResult && !isLoading && (
              <div className="tw:bg-gray-800 tw:rounded-lg tw:p-6 tw:border tw:border-gray-700" style={{ marginTop: '8px', marginBottom: '8px' }}>
                <div className="tw:mb-4 tw:flex tw:items-center tw:justify-between">
                  <h2 className="tw:text-2xl tw:font-bold tw:text-white tw:capitalize">
                    {currentResult.word}
                  </h2>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    style={{ paddingTop: '12px', paddingBottom: '12px', paddingLeft: '20px', paddingRight: '20px' }}
                    className="tw:bg-gradient-to-r tw:from-green-500 tw:to-green-600 tw:text-white tw:rounded-xl tw:font-semibold tw:text-sm tw:shadow-lg tw:shadow-green-500/30 tw:hover:shadow-xl tw:hover:shadow-green-500/40 tw:hover:scale-[1.05] tw:active:scale-[0.95] tw:disabled:opacity-50 tw:disabled:cursor-not-allowed tw:disabled:hover:scale-100 tw:transition-all tw:duration-200 tw:flex tw:items-center tw:justify-center"
                  >
                    {isSaving ? (
                      <div className="tw:w-5 tw:h-5 tw:border-2 tw:border-white/30 tw:border-t-white tw:rounded-full tw:animate-spin"></div>
                    ) : (
                      <span className="tw:text-xl">💾</span>
                    )}
                  </button>
                </div>

                <div className="tw:max-h-[60vh] tw:overflow-y-auto tw:pr-2">
                  {/* Definition */}
                  <div style={{ paddingTop: '8px', paddingBottom: '8px', paddingLeft: '8px', paddingRight: '8px' }}>
                    <h3 className="tw:text-lg tw:font-semibold tw:text-blue-400 tw:mb-2">Definition</h3>
                    <p className="tw:text-gray-300">{currentResult.definition}</p>
                  </div>

                  {/* Example Sentences */}
                  <div style={{ paddingTop: '8px', paddingBottom: '8px', paddingLeft: '8px', paddingRight: '8px' }}>
                    <h3 className="tw:text-lg tw:font-semibold tw:text-blue-400 tw:mb-2">Example Sentences</h3>
                    <ul className="tw:list-disc tw:list-inside tw:space-y-1">
                      {currentResult.exampleSentences.map((sentence, idx) => (
                        <li key={idx} className="tw:text-gray-300">{sentence}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Turkish Equivalent */}
                  <div style={{ paddingTop: '8px', paddingBottom: '8px', paddingLeft: '8px', paddingRight: '8px' }}>
                    <h3 className="tw:text-lg tw:font-semibold tw:text-blue-400 tw:mb-2">Turkish Equivalent</h3>
                    <p className="tw:text-gray-300">{currentResult.turkishEquivalent}</p>
                  </div>

                  {/* Etymology */}
                  <div style={{ paddingTop: '8px', paddingBottom: '8px', paddingLeft: '8px', paddingRight: '8px' }}>
                    <h3 className="tw:text-lg tw:font-semibold tw:text-blue-400 tw:mb-2">Etymology</h3>
                    <p className="tw:text-gray-300">{currentResult.etymology}</p>
                  </div>

                  {/* How to Remember */}
                  <div style={{ paddingTop: '8px', paddingBottom: '8px', paddingLeft: '8px', paddingRight: '8px' }}>
                    <h3 className="tw:text-lg tw:font-semibold tw:text-blue-400 tw:mb-2">How to Remember</h3>
                    <p className="tw:text-gray-300">{currentResult.howToRemember}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Saved Words Tab */}
        {activeTab === 'saved' && (() => {
          const filteredWords = savedWords.filter((wordData) => 
            wordData.word.toLowerCase().includes(savedWordsSearch.toLowerCase()) ||
            wordData.definition.toLowerCase().includes(savedWordsSearch.toLowerCase()) ||
            wordData.turkishEquivalent.toLowerCase().includes(savedWordsSearch.toLowerCase())
          )
          
          return (
            <div>
              {/* Search Bar */}
              {savedWords.length > 0 && (
                <div className="tw:mb-4">
                  <input
                    type="text"
                    value={savedWordsSearch}
                    onChange={(e) => setSavedWordsSearch(e.target.value)}
                    placeholder="Search saved words..."
                    style={{ paddingTop: '16px', paddingBottom: '16px', paddingLeft: '28px', paddingRight: '28px' }}
                    className="tw:w-full tw:bg-gray-800/80 tw:backdrop-blur-sm tw:border tw:border-gray-700/50 tw:text-white tw:text-lg tw:placeholder-gray-400 tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-blue-500/50 tw:focus:border-blue-500/50 tw:shadow-lg tw:transition-all tw:duration-200"
                  />
                </div>
              )}
              
              {savedWords.length === 0 ? (
                <div className="tw:text-center tw:py-12 tw:text-gray-400">
                  No saved words yet. Search for words and save them to see them here.
                </div>
              ) : filteredWords.length === 0 ? (
                <div className="tw:text-center tw:py-12 tw:text-gray-400">
                  No words found matching "{savedWordsSearch}"
                </div>
              ) : (
                <div>
                  {filteredWords.map((wordData) => (
                    <WordCard key={wordData.word} wordData={wordData} onDelete={handleDelete} isDeleting={isDeleting === wordData.word} />
                  ))}
                </div>
              )}
            </div>
          )
        })()}
      </div>
    </div>
  )
}

interface WordCardProps {
  wordData: WordData
  onDelete: (word: string) => void
  isDeleting: boolean
}

function WordCard({ wordData, onDelete, isDeleting }: WordCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="tw:bg-gray-700/80 tw:backdrop-blur-sm tw:rounded-xl tw:border-2 tw:border-gray-600/50 tw:overflow-hidden tw:shadow-lg tw:hover:shadow-xl tw:hover:border-gray-500 tw:transition-all tw:duration-200" style={{ marginTop: '8px', marginBottom: '8px' }}>
      <div className="tw:flex tw:items-center tw:justify-between" style={{ paddingTop: '20px', paddingBottom: '20px', paddingLeft: '24px', paddingRight: '24px' }}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="tw:flex-1 tw:text-left tw:hover:opacity-80 tw:transition-opacity"
        >
          <h3 className="tw:text-xl tw:font-bold tw:text-white tw:capitalize">
            {wordData.word}
          </h3>
        </button>
        <button
          onClick={() => onDelete(wordData.word)}
          disabled={isDeleting}
          style={{ paddingTop: '12px', paddingBottom: '12px', paddingLeft: '16px', paddingRight: '16px' }}
          className="tw:bg-gradient-to-r tw:from-red-500 tw:to-red-600 tw:text-white tw:rounded-xl tw:shadow-lg tw:shadow-red-500/30 tw:hover:shadow-xl tw:hover:shadow-red-500/40 tw:hover:scale-[1.05] tw:active:scale-[0.95] tw:disabled:opacity-50 tw:disabled:cursor-not-allowed tw:disabled:hover:scale-100 tw:transition-all tw:duration-200 tw:ml-4 tw:flex tw:items-center tw:justify-center"
        >
          {isDeleting ? (
            <div className="tw:w-5 tw:h-5 tw:border-2 tw:border-white/30 tw:border-t-white tw:rounded-full tw:animate-spin"></div>
          ) : (
            <span className="tw:text-xl">🗑️</span>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="tw:border-t-2 tw:border-gray-600/50 tw:bg-gray-800/60" style={{ paddingTop: '24px', paddingBottom: '24px', paddingLeft: '24px', paddingRight: '24px' }}>
          {/* Definition */}
          <div style={{ paddingTop: '8px', paddingBottom: '8px', paddingLeft: '8px', paddingRight: '8px' }}>
            <h4 className="tw:text-md tw:font-semibold tw:text-blue-400 tw:mb-2">Definition</h4>
            <p className="tw:text-gray-300">{wordData.definition}</p>
          </div>

          {/* Example Sentences */}
          <div style={{ paddingTop: '8px', paddingBottom: '8px', paddingLeft: '8px', paddingRight: '8px' }}>
            <h4 className="tw:text-md tw:font-semibold tw:text-blue-400 tw:mb-2">Example Sentences</h4>
            <ul className="tw:list-disc tw:list-inside tw:space-y-1">
              {wordData.exampleSentences.map((sentence, idx) => (
                <li key={idx} className="tw:text-gray-300">{sentence}</li>
              ))}
            </ul>
          </div>

          {/* Turkish Equivalent */}
          <div style={{ paddingTop: '8px', paddingBottom: '8px', paddingLeft: '8px', paddingRight: '8px' }}>
            <h4 className="tw:text-md tw:font-semibold tw:text-blue-400 tw:mb-2">Turkish Equivalent</h4>
            <p className="tw:text-gray-300">{wordData.turkishEquivalent}</p>
          </div>

          {/* Etymology */}
          <div style={{ paddingTop: '8px', paddingBottom: '8px', paddingLeft: '8px', paddingRight: '8px' }}>
            <h4 className="tw:text-md tw:font-semibold tw:text-blue-400 tw:mb-2">Etymology</h4>
            <p className="tw:text-gray-300">{wordData.etymology}</p>
          </div>

          {/* How to Remember */}
          <div style={{ paddingTop: '8px', paddingBottom: '8px', paddingLeft: '8px', paddingRight: '8px' }}>
            <h4 className="tw:text-md tw:font-semibold tw:text-blue-400 tw:mb-2">How to Remember</h4>
            <p className="tw:text-gray-300">{wordData.howToRemember}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default EtymoDictionary
