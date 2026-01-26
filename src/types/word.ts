/**
 * Word data type definitions
 */

export interface WordData {
  word: string
  definition: string
  exampleSentences: string[]
  turkishEquivalent: string[]
  etymology: string
  etymologyLink?: string
  howToRemember: string
  pronunciation?: {
    ipa_uk?: string
    ipa_us?: string
    easy_uk?: string
    easy_us?: string
  }
}
