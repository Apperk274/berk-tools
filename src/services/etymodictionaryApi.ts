import { type WordData } from '../components/etymodictionary/WordDetails'

const STORAGE_KEY = 'etymodictionary-words'

/**
 * Search for a word definition
 * @param word - The word to search for
 * @returns Promise resolving to WordData
 */
export async function searchWord(word: string): Promise<WordData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))

  // TODO: Replace with actual API call:
  // const response = await fetch(`/api/words/${encodeURIComponent(word)}`)
  // if (!response.ok) throw new Error('Failed to search word')
  // return response.json()

  // Mock response
  return {
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
