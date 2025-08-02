'use client'

import { OnboardingQuestion } from '@/types'

interface QuestionCardProps {
  question: OnboardingQuestion
  selectedAnswer: string
  onAnswerSelect: (answer: string) => void
}

export default function QuestionCard({ 
  question, 
  selectedAnswer, 
  onAnswerSelect 
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {question.question}
      </h2>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(option)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
              selectedAnswer === option
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}