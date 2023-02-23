import { useState, useEffect } from 'react'

export default function useSentence(answers, options) {
  const [sentence, setSentence] = useState([])
  useEffect(() => {
    setSentence(
      answers
        ? answers
            .map((answer, index) => {
              const sentence = options.find((option) => option.value === answer)
                ? options.find((option) => option.value === answer).answer ||
                  options.find((option) => option.value === answer).answer ===
                    ''
                  ? options.find((option) => option.value === answer).answer
                  : options.find((option) => option.value === answer).label
                : ''
              return index === 0
                ? sentence + (index === answers.length - 1 ? '.' : '')
                : index > 0 && index < answers.length - 1
                ? `, ${sentence}`
                : ` et ${sentence}.`
            })
            .join('')
            .split('')
        : []
    )
  }, [answers, options])

  return sentence
}
