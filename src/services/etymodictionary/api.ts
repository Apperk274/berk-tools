/**
 * EtymoDictionary API client
 */

import axios from 'axios'
import { config } from '../../config'
import { getAuthHeader } from '../authService'
import type { ApiWordResponse, SavedLemma } from '../../types/api'
import type { WordData } from '../../types/word'
import { transformApiResponseToWordData } from './transformers'

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

    const data = response.data as ApiWordResponse
    return transformApiResponseToWordData(data, word)
  } catch (error) {
    console.error('Error searching word:', error)
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        // Clear token and let the app redirect to login
        const { clearToken } = await import('../authService')
        clearToken()
        throw new Error('Session expired. Please login again.')
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
        const { clearToken } = await import('../authService')
        clearToken()
        throw new Error('Session expired. Please login again.')
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
    
    const data = response.data as ApiWordResponse
    return transformApiResponseToWordData(data, lemma)
  } catch (error) {
    console.error(`Error loading lemma details for: ${lemma}`, error)
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        const { clearToken } = await import('../authService')
        clearToken()
        throw new Error('Session expired. Please login again.')
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
        const { clearToken } = await import('../authService')
        clearToken()
        throw new Error('Session expired. Please login again.')
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
        const { clearToken } = await import('../authService')
        clearToken()
        throw new Error('Session expired. Please login again.')
      }
      throw new Error(`Failed to delete word: ${error.message}`)
    }
    
    throw error
  }
}
