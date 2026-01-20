import axios, { AxiosError } from 'axios'
import { type WordData } from '../components/etymodictionary/WordDetails'
import { config } from '../config'
import { getAuthHeader } from './authService'

const STORAGE_KEY = 'etymodictionary-words'

export interface SavedLemma {
  lemma: string
  created_at: string
}

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
    const response = await axios.post(
      `${config.BACKEND_URL}/etymodictionary/look-up`,
      {
        message: word,
        force: false
      },
      {
        headers: {
          'Authorization': authHeader
        }
      }
    )

    const data = response.data

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
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please login again.')
      }
      throw new Error(`Failed to search word: ${error.message}`)
    }
    
    throw error
  }
}

/**
 * Load all saved lemmas (without details)
 * @returns Promise resolving to array of SavedLemma
 */
export async function loadSavedWords(): Promise<SavedLemma[]> {
  const authHeader = getAuthHeader()
  if (!authHeader) {
    throw new Error('Authentication required')
  }

  try {
    const response = await axios.get(
      `${config.BACKEND_URL}/etymodictionary/saved`,
      {
        headers: {
          'Authorization': authHeader
        }
      }
    )

    return response.data as SavedLemma[]
  } catch (error) {
    console.error('Error loading saved words:', error)
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please login again.')
      }
      throw new Error(`Failed to load saved words: ${error.message}`)
    }
    
    throw error
  }
}

/**
 * Load details for a specific lemma
 * @param lemma - The lemma to load details for
 * @returns Promise resolving to WordData
 */
export async function loadLemmaDetails(lemma: string): Promise<WordData> {
  const authHeader = getAuthHeader()
  if (!authHeader) {
    throw new Error('Authentication required')
  }

  try {
    const response = await axios.get(
      `${config.BACKEND_URL}/etymodictionary/lemma`,
      {
        params: { lemma },
        headers: {
          'Authorization': authHeader
        }
      }
    )
    
    const data = response.data
    
    // Transform API response to WordData format
    const turkishMeanings = data.meaning_tr?.map((item: any) => {
      const translations = item.tr?.join(', ') || ''
      return item.sense ? `${item.sense}: ${translations}` : translations
    }) || []

    const etymologyText = data.etymology?.text || ''
    const etymologyLink = data.etymology?.link || undefined

    const pronunciation = data.pronunciation ? 
      `UK: ${data.pronunciation.easy_uk || data.pronunciation.ipa_uk || ''} | US: ${data.pronunciation.easy_us || data.pronunciation.ipa_us || ''}` : ''

    return {
      word: data.target || lemma,
      definition: data.meaning_en || '',
      exampleSentences: data.examples || [],
      turkishEquivalent: turkishMeanings,
      etymology: etymologyText + (pronunciation ? `\n\nPronunciation: ${pronunciation}` : ''),
      etymologyLink: etymologyLink,
      howToRemember: data.remember_insight || ''
    }
  } catch (error) {
    console.error(`Error loading lemma details for: ${lemma}`, error)
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please login again.')
      }
      throw new Error(`Failed to load lemma details: ${error.message}`)
    }
    
    throw error
  }
}

/**
 * Save a word to the saved words list
 * @param wordData - The word data to save
 * @returns Promise resolving to void
 */
export async function saveWord(wordData: WordData): Promise<void> {
  const authHeader = getAuthHeader()
  if (!authHeader) {
    throw new Error('Authentication required')
  }

  try {
    await axios.post(
      `${config.BACKEND_URL}/etymodictionary/save`,
      {
        lemma: wordData.word
      },
      {
        headers: {
          'Authorization': authHeader
        }
      }
    )
  } catch (error) {
    console.error('Error saving word:', error)
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please login again.')
      }
      throw new Error(`Failed to save word: ${error.message}`)
    }
    
    throw error
  }
}

/**
 * Delete a saved word
 * @param word - The word to delete
 * @returns Promise resolving to void
 */
export async function deleteWord(word: string): Promise<void> {
  const authHeader = getAuthHeader()
  if (!authHeader) {
    throw new Error('Authentication required')
  }

  try {
    await axios.delete(
      `${config.BACKEND_URL}/etymodictionary/lemma`,
      {
        params: { lemma: word },
        headers: {
          'Authorization': authHeader
        }
      }
    )
  } catch (error) {
    console.error('Error deleting word:', error)
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please login again.')
      }
      throw new Error(`Failed to delete word: ${error.message}`)
    }
    
    throw error
  }
}

/**
 * Sync saved words to localStorage (utility function for components)
 * Note: This is kept for backward compatibility but may not be needed with API backend
 * @param words - Array of WordData to sync
 */
export function syncSavedWordsToStorage(words: WordData[]): void {
  // Optional: Keep local cache for offline access
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(words))
  } catch (e) {
    console.error('Failed to sync saved words to localStorage:', e)
  }
}
