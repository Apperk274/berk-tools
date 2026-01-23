import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Tabs from '../components/ui/Tabs'
import SearchTab from '../components/etymodictionary/SearchTab'
import SavedWordsTab from '../components/etymodictionary/SavedWordsTab'
import AuthGuard from '../components/auth/AuthGuard'
import type { WordData } from '../types/word'
import type { SavedLemma } from '../types/api'
import { loadSavedWords, saveWord, deleteWord } from '../services/etymodictionary'

function EtymoDictionary() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'search' | 'saved'>('search')
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [savedWords, setSavedWords] = useState<SavedLemma[]>([])

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

  const handleSave = async (wordData: WordData) => {
    if (!isSaving) {
      setIsSaving(true)
      try {
        await saveWord(wordData)
        // Add the new lemma to the list
        const newLemma: SavedLemma = {
          lemma: wordData.word,
          created_at: new Date().toISOString()
        }
        const updated = [...savedWords, newLemma]
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

  const handleDelete = async (lemma: string) => {
    if (isDeleting) return
    setIsDeleting(lemma)
    try {
      await deleteWord(lemma)
      const updated = savedWords.filter(w => w.lemma !== lemma)
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
    { id: 'saved', label: 'Saved', badge: Array.isArray(savedWords) && savedWords.length > 0 ? savedWords.length : undefined }
  ]

  return (
    <AuthGuard>
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
              <SearchTab 
                onSave={handleSave} 
                isSaving={isSaving}
                savedWords={savedWords}
              />
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
    </AuthGuard>
  )
}

export default EtymoDictionary
