interface WordData {
  word: string
  definition: string
  exampleSentences: string[]
  turkishEquivalent: string
  etymology: string
  howToRemember: string
}

interface WordDetailsProps {
  wordData: WordData
  headingSize?: 'md' | 'lg'
}

export default function WordDetails({ wordData, headingSize = 'lg' }: WordDetailsProps) {
  const headingClass = headingSize === 'lg' ? 'tw:text-lg tw:font-semibold' : 'tw:text-md tw:font-semibold'
  const sectionPadding = 'tw:py-2 tw:px-2'

  return (
    <>
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
        <p className="tw:text-gray-300">{wordData.turkishEquivalent}</p>
      </div>

      {/* Etymology */}
      <div className={sectionPadding}>
        <h3 className={`${headingClass} tw:text-blue-400 tw:mb-2`}>Etymology</h3>
        <p className="tw:text-gray-300">{wordData.etymology}</p>
      </div>

      {/* How to Remember */}
      <div className={sectionPadding}>
        <h3 className={`${headingClass} tw:text-blue-400 tw:mb-2`}>How to Remember</h3>
        <p className="tw:text-gray-300">{wordData.howToRemember}</p>
      </div>
    </>
  )
}

export type { WordData }
