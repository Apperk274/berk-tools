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
}
