import { type WordData } from '../components/etymodictionary/WordDetails'
import { config } from '../config'
import { getAuthHeader } from './authService'

const STORAGE_KEY = 'etymodictionary-words'

/**
 * Search for a word definition
 * @param word - The word to search for
 * @returns Promise resolving to WordData
 */
export async function searchWord(word: string): Promise<WordData> {
  const authHeader = getAuthHeader()
  if (!authHeader) {
    throw new Error('Authentication required')
  }

  try {
    const response = await fetch(`${config.BACKEND_URL}/etymodictionary/look-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({
        message: word,
        force: false
      })
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed. Please login again.')
      }
      throw new Error(`Failed to search word: ${response.statusText}`)
    }

    const data = await response.json()

    // Transform API response to WordData format
    // Format Turkish meanings from the API structure as bullet points
    const turkishMeanings = data.meaning_tr?.map((item: any) => {
      const translations = item.tr?.join(', ') || ''
      return item.sense ? `${item.sense}: ${translations}` : translations
    }) || []

    // Format etymology from the API structure
    const etymologyText = data.etymology?.text || ''
    const etymologyLink = data.etymology?.link || undefined

    // Format pronunciation
    const pronunciation = data.pronunciation ?
      `UK: ${data.pronunciation.easy_uk || data.pronunciation.ipa_uk || ''} | US: ${data.pronunciation.easy_us || data.pronunciation.ipa_us || ''}` : ''

    return {
      word: data.target || word.toLowerCase(),
      definition: data.meaning_en || '',
      exampleSentences: data.examples || [],
      turkishEquivalent: turkishMeanings,
      etymology: etymologyText + (pronunciation ? `\n\nPronunciation: ${pronunciation}` : ''),
      etymologyLink: etymologyLink,
      howToRemember: data.remember_insight || ''
    }
  } catch (error) {
    console.error('Error searching word:', error)
    throw error
  }
}

/**
 * Load all saved words
 * @returns Promise resolving to array of WordData
 */
export async function loadSavedWords(): Promise<WordData[]> {
  // TODO: Replace with actual API call:
  // const response = await fetch('/api/saved-words')
  // if (!response.ok) throw new Error('Failed to load saved words')
  // return response.json()

  // Mock API call - replace with actual API endpoint
  await new Promise(resolve => setTimeout(resolve, 500))

  // For now, load from localStorage as fallback
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (e) {
    console.error('Failed to load saved words from localStorage:', e)
  }

  return []
}

/**
 * Save a word to the saved words list
 * @param wordData - The word data to save
 * @returns Promise resolving to void
 */
export async function saveWord(wordData: WordData): Promise<void> {
  // TODO: Replace with actual API call:
  // const response = await fetch('/api/saved-words', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(wordData)
  // })
  // if (!response.ok) throw new Error('Failed to save word')

  // Mock API call - replace with actual API endpoint
  await new Promise(resolve => setTimeout(resolve, 800))

  // For now, update localStorage as fallback
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    const savedWords: WordData[] = saved ? JSON.parse(saved) : []
    const updated = [...savedWords, wordData]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (e) {
    console.error('Failed to save word to localStorage:', e)
    throw new Error('Failed to save word')
  }
}

/**
 * Delete a saved word
 * @param word - The word to delete
 * @returns Promise resolving to void
 */
export async function deleteWord(word: string): Promise<void> {
  // TODO: Replace with actual API call:
  // const response = await fetch(`/api/saved-words/${encodeURIComponent(word)}`, {
  //   method: 'DELETE'
  // })
  // if (!response.ok) throw new Error('Failed to delete word')

  // Mock API call - replace with actual API endpoint
  await new Promise(resolve => setTimeout(resolve, 600))

  // For now, update localStorage as fallback
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const savedWords: WordData[] = JSON.parse(saved)
      const updated = savedWords.filter(w => w.word !== word)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    }
  } catch (e) {
    console.error('Failed to delete word from localStorage:', e)
    throw new Error('Failed to delete word')
  }
}

/**
 * Sync saved words to localStorage (utility function for components)
 * @param words - Array of WordData to sync
 */
export function syncSavedWordsToStorage(words: WordData[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(words))
  } catch (e) {
    console.error('Failed to sync saved words to localStorage:', e)
  }
}
