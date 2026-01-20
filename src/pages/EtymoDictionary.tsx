import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Tabs from '../components/ui/Tabs'
import SearchTab from '../components/etymodictionary/SearchTab'
import SavedWordsTab from '../components/etymodictionary/SavedWordsTab'
import { type WordData } from '../components/etymodictionary/WordDetails'
import { loadSavedWords, saveWord, deleteWord, syncSavedWordsToStorage } from '../services/etymodictionaryApi'
import { isAuthenticated, login } from '../services/authService'

function EtymoDictionary() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'search' | 'saved'>('search')
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [savedWords, setSavedWords] = useState<WordData[]>([])

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated()) {
      const loggedIn = login()
      if (!loggedIn) {
        alert('Authentication is required to access EtymoDictionary')
        navigate('/')
        return
      }
    }
  }, [navigate])

  // Load saved words from API on mount
  useEffect(() => {
    const loadWords = async () => {
      try {
        const words = await loadSavedWords()
        setSavedWords(words)
      } catch (e) {
        console.error('Failed to load saved words:', e)
      }
    }
    loadWords()
  }, [])

  // Sync saved words to localStorage when they change
  useEffect(() => {
    syncSavedWordsToStorage(savedWords)
  }, [savedWords])

  const handleSave = async (wordData: WordData) => {
    if (!isSaving) {
      setIsSaving(true)
      try {
        await saveWord(wordData)
        const updated = [...savedWords, wordData]
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
      await deleteWord(word)
      const updated = savedWords.filter(w => w.word !== word)
      setSavedWords(updated)
    } catch (e) {
      console.error('Failed to delete word:', e)
      alert('Failed to delete word. Please try again.')
    } finally {
      setIsDeleting(null)
    }
  }

  const tabs = [
    { id: 'search', label: 'Look Up' },
    { id: 'saved', label: 'Saved', badge: savedWords.length > 0 ? savedWords.length : undefined }
  ]

  return (
    <div className="tw:h-full tw:flex tw:flex-col tw:overflow-hidden">
      {/* Header */}
      <div className="tw:flex tw:justify-between tw:flex-shrink-0 tw:mb-4">
        <Button
          onClick={() => navigate('/')}
          variant="secondary"
          className="tw:py-3 tw:px-4"
          icon={<span className="tw:text-xl">←</span>}
        >
          Back to Home
        </Button>
        <h1 className="tw:text-4xl tw:font-bold tw:text-white">
          <span className="tw:bg-linear-to-r tw:from-blue-400 tw:via-purple-500 tw:to-pink-500 tw:bg-clip-text tw:text-transparent">
            EtymoDictionary
          </span>
        </h1>
      </div>

      {/* Tabs and Content */}
      <div className="tw:max-w-4xl tw:mx-auto tw:w-full tw:flex tw:flex-col tw:flex-1 tw:overflow-hidden">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId as 'search' | 'saved')}
          className="tw:my-3 tw:flex-shrink-0"
        />

        {/* Scrollable Content Area */}
        <div className="tw:flex-1 tw:overflow-y-auto tw:overflow-x-hidden">
          {/* Search Tab */}
          {activeTab === 'search' && (
            <SearchTab onSave={handleSave} isSaving={isSaving} />
          )}

          {/* Saved Words Tab */}
          {activeTab === 'saved' && (
            <SavedWordsTab
              savedWords={savedWords}
              onDelete={handleDelete}
              isDeleting={isDeleting}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default EtymoDictionary
