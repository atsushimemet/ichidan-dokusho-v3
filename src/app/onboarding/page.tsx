'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import QuestionCard from '@/components/onboarding/QuestionCard'
import { OnboardingQuestion, OnboardingAnswer } from '@/types'

const QUESTIONS: OnboardingQuestion[] = [
  {
    id: '1',
    question: '普段どのくらいの時間で読書をしたいですか？',
    options: [
      '5分以内（通勤時間などのスキマ時間）',
      '15〜30分（昼休みなど）',
      '1時間以上（じっくり読みたい）'
    ],
    order: 1
  },
  {
    id: '2',
    question: 'どのようなジャンルの本に興味がありますか？',
    options: [
      'ビジネス・自己啓発',
      '小説・エッセイ',
      '実用書・ハウツー',
      '歴史・哲学'
    ],
    order: 2
  },
  {
    id: '3',
    question: '読書の目的は何ですか？',
    options: [
      'スキルアップ・成長',
      'リラックス・娯楽',
      '知識・教養を身につける',
      '新しい視点を得る'
    ],
    order: 3
  }
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<OnboardingAnswer[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState('')

  const currentQuestion = QUESTIONS[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleNext = async () => {
    if (!selectedAnswer) return

    const newAnswers = [
      ...answers,
      { questionId: currentQuestion.id, answer: selectedAnswer }
    ]
    setAnswers(newAnswers)

    if (isLastQuestion) {
      // Save answers and redirect to recommendation
      try {
        const response = await fetch('/api/onboarding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: newAnswers })
        })
        
        if (response.ok) {
          const result = await response.json()
          // Store answers in sessionStorage for alternatives page
          sessionStorage.setItem('onboardingAnswers', JSON.stringify(newAnswers))
          router.push(`/recommendation/${result.recommendationId}`)
        }
      } catch (error) {
        console.error('Failed to save answers:', error)
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer('')
    }
  }

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setSelectedAnswer(answers[currentQuestionIndex - 1]?.answer || '')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            あなたにぴったりの本を見つけましょう
          </h1>
          <p className="text-gray-600">
            {currentQuestionIndex + 1} / {QUESTIONS.length}
          </p>
        </div>

        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
        />

        <div className="flex justify-between max-w-2xl mx-auto mt-8">
          <button
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg disabled:opacity-50"
          >
            戻る
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg disabled:opacity-50 hover:bg-primary-700"
          >
            {isLastQuestion ? '推薦を受ける' : '次へ'}
          </button>
        </div>
      </div>
    </main>
  )
}