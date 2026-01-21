/**
 * API-related type definitions
 */

export interface SavedLemma {
  lemma: string
  created_at: string
}

export interface MeaningTr {
  tr: string[]
  sense: string
}

export interface Etymology {
  link?: string
  text: string
  source?: string
}

export interface Pronunciation {
  ipa_uk?: string
  ipa_us?: string
  easy_uk?: string
  easy_us?: string
}

export interface ApiWordResponse {
  target: string
  examples: string[]
  etymology: Etymology
  meaning_en: string
  meaning_tr: MeaningTr[]
  pronunciation: Pronunciation
  remember_insight: string
}
