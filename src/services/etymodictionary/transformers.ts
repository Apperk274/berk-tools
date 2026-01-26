/**
 * Data transformation utilities for EtymoDictionary API
 */

import type { ApiWordResponse, MeaningTr } from '../../types/api'
import type { WordData } from '../../types/word'

/**
 * Transform API response to WordData format
 */
export function transformApiResponseToWordData(data: ApiWordResponse, fallbackWord?: string): WordData {
  // Format Turkish meanings from the API structure as bullet points
  const turkishMeanings = data.meaning_tr?.map((item: MeaningTr) => {
    const translations = item.tr?.join(', ') || ''
    return item.sense ? `${item.sense}: ${translations}` : translations
  }) || []

  // Format etymology from the API structure
  const etymologyText = data.etymology?.text || ''
  const etymologyLink = data.etymology?.link || undefined

  // Format pronunciation for display
  const pronunciationDisplay = data.pronunciation ? 
    `UK: ${data.pronunciation.easy_uk || data.pronunciation.ipa_uk || ''} | US: ${data.pronunciation.easy_us || data.pronunciation.ipa_us || ''}` : ''

  return {
    word: data.target || fallbackWord || '',
    definition: data.meaning_en || '',
    exampleSentences: data.examples || [],
    turkishEquivalent: turkishMeanings,
    etymology: etymologyText + (pronunciationDisplay ? `\n\nPronunciation: ${pronunciationDisplay}` : ''),
    etymologyLink: etymologyLink,
    howToRemember: data.remember_insight || '',
    pronunciation: data.pronunciation
  }
}
