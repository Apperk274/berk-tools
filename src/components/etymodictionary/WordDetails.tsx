import { useState } from 'react'
import type { WordData } from '../../types/word'
import { speakIPA } from '../../services/mespeak'
import Button from '../ui/Button'

interface WordDetailsProps {
  wordData: WordData
  headingSize?: 'md' | 'lg'
}

export default function WordDetails({ wordData, headingSize = 'lg' }: WordDetailsProps) {
  const headingClass = headingSize === 'lg' ? 'tw:text-lg tw:font-semibold' : 'tw:text-md tw:font-semibold'
  const sectionPadding = 'tw:py-2 tw:px-2'
  const [isPlayingUK, setIsPlayingUK] = useState(false)
  const [isPlayingUS, setIsPlayingUS] = useState(false)

  const handlePlayPronunciation = async (ipa: string, variant: 'UK' | 'US') => {
    try {
      if (variant === 'UK') {
        setIsPlayingUK(true)
      } else {
        setIsPlayingUS(true)
      }
      
      await speakIPA(ipa)
    } catch (error) {
      console.error(`Failed to play ${variant} pronunciation:`, error)
      alert(`Failed to play ${variant} pronunciation. Please try again.`)
    } finally {
      if (variant === 'UK') {
        setIsPlayingUK(false)
      } else {
        setIsPlayingUS(false)
      }
    }
  }

  return (
    <>
      {/* Pronunciation */}
      {wordData.pronunciation && (wordData.pronunciation.ipa_uk || wordData.pronunciation.ipa_us) && (
        <div className={sectionPadding}>
          <h3 className={`${headingClass} tw:text-blue-400 tw:mb-2`}>Pronunciation</h3>
          <div className="tw:flex tw:gap-4 tw:flex-wrap">
            {wordData.pronunciation.ipa_uk && (
              <div className="tw:flex tw:flex-col tw:gap-1">
                <span className="tw:text-gray-400 tw:text-sm">UK: {wordData.pronunciation.ipa_uk}</span>
                <Button
                  onClick={() => handlePlayPronunciation(wordData.pronunciation!.ipa_uk!, 'UK')}
                  disabled={isPlayingUK}
                  className="tw:text-sm tw:py-1 tw:px-3"
                >
                  {isPlayingUK ? '🔊 Playing...' : '🔊 Play UK'}
                </Button>
              </div>
            )}
            {wordData.pronunciation.ipa_us && (
              <div className="tw:flex tw:flex-col tw:gap-1">
                <span className="tw:text-gray-400 tw:text-sm">US: {wordData.pronunciation.ipa_us}</span>
                <Button
                  onClick={() => handlePlayPronunciation(wordData.pronunciation!.ipa_us!, 'US')}
                  disabled={isPlayingUS}
                  className="tw:text-sm tw:py-1 tw:px-3"
                >
                  {isPlayingUS ? '🔊 Playing...' : '🔊 Play US'}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Definition */}
      <div className={sectionPadding}>
        <h3 className={`${headingClass} tw:text-blue-400 tw:mb-2`}>Definition</h3>
        <p className="tw:text-gray-300">{wordData.definition}</p>
      </div>

      {/* Example Sentences */}
      <div className={sectionPadding}>
        <h3 className={`${headingClass} tw:text-blue-400 tw:mb-2`}>Example Sentences</h3>
        <ul className="tw:list-disc tw:list-inside tw:space-y-1">
          {wordData.exampleSentences.map((sentence, idx) => (
            <li key={idx} className="tw:text-gray-300">{sentence}</li>
          ))}
        </ul>
      </div>

      {/* Turkish Equivalent */}
      <div className={sectionPadding}>
        <h3 className={`${headingClass} tw:text-blue-400 tw:mb-2`}>Turkish Equivalent</h3>
        <ul className="tw:list-disc tw:list-inside tw:space-y-1">
          {wordData.turkishEquivalent.map((meaning, idx) => (
            <li key={idx} className="tw:text-gray-300">{meaning}</li>
          ))}
        </ul>
      </div>

      {/* Etymology */}
      <div className={sectionPadding}>
        <h3 className={`${headingClass} tw:text-blue-400 tw:mb-2`}>Etymology</h3>
        <p className="tw:text-gray-300 tw:whitespace-pre-line">
          {wordData.etymology}
          {wordData.etymologyLink && (
            <>
              {' '}
              <a 
                href={wordData.etymologyLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="tw:text-blue-400 tw:underline hover:tw:text-blue-300 tw:transition-colors"
              >
                [Source]
              </a>
            </>
          )}
        </p>
      </div>

      {/* How to Remember */}
      <div className={sectionPadding}>
        <h3 className={`${headingClass} tw:text-blue-400 tw:mb-2`}>How to Remember</h3>
        <p className="tw:text-gray-300">{wordData.howToRemember}</p>
      </div>
    </>
  )
}

