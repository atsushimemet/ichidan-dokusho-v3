'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import BookCard from '@/components/recommendation/BookCard'
import { BookRecommendation, getAllRecommendationsWithOriginal } from '@/lib/recommendations'
import { OnboardingAnswer } from '@/types'

interface AlternativesPageProps {
  params: { id: string }
}

export default function AlternativesPage({ params }: AlternativesPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [allBooks, setAllBooks] = useState<BookRecommendation[]>([])
  const [currentIndex, setCurrentIndex] = useState(1) // Start from index 1 (2nd book)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get answers from sessionStorage or use defaults
    let answers: OnboardingAnswer[] = [
      { questionId: '1', answer: '15〜30分（昼休みなど）' },
      { questionId: '2', answer: 'ビジネス・自己啓発' },
      { questionId: '3', answer: 'スキルアップ・成長' }
    ]

    try {
      const storedAnswers = sessionStorage.getItem('onboardingAnswers')
      if (storedAnswers) {
        answers = JSON.parse(storedAnswers)
      }
    } catch (error) {
      console.error('Failed to parse stored answers:', error)
    }

    const allRecommendations = getAllRecommendationsWithOriginal(params.id, answers)
    setAllBooks(allRecommendations)
    setLoading(false)
  }, [params.id])

  const handleNextBook = () => {
    if (currentIndex < allBooks.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(1) // Loop back to first alternative (skip original book at index 0)
    }
  }

  const handleBackToRecommendation = () => {
    // Get the original recommendation ID from sessionStorage
    try {
      const originalId = sessionStorage.getItem('originalRecommendationId')
      if (originalId) {
        router.push(`/recommendation/${originalId}`)
        return
      }
      
      // Fallback: try to get from stored recommendation object
      const storedRecommendation = sessionStorage.getItem('currentRecommendation')
      if (storedRecommendation) {
        const recommendation = JSON.parse(storedRecommendation)
        router.push(`/recommendation/${recommendation.id}`)
        return
      }
    } catch (error) {
      console.error('Failed to parse stored recommendation:', error)
    }
    
    // Final fallback: use business-1 (7つの習慣) as default
    router.push('/recommendation/business-1')
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">他の本を探しています...</p>
        </div>
      </main>
    )
  }

  if (allBooks.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">他の推薦本が見つかりませんでした。</p>
          <button
            onClick={handleBackToRecommendation}
            className="mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
          >
            戻る
          </button>
        </div>
      </main>
    )
  }

  const currentBook = allBooks[currentIndex]

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            他のおすすめの本
          </h1>
          <p className="text-gray-600">
            あなたの興味に合わせた別の選択肢をご提案します
          </p>
          <div className="mt-4 text-sm text-gray-500">
            {currentIndex + 1} / {allBooks.length}
          </div>
        </div>

        <BookCard book={currentBook} showAlternatives={false} />

        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={handleBackToRecommendation}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            最初の推薦に戻る
          </button>
          
          {allBooks.length > 1 && (
            <button
              onClick={handleNextBook}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              {currentIndex < allBooks.length - 1 ? '次の本を見る' : '最初の本に戻る'}
            </button>
          )}
        </div>

        {allBooks.length > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {allBooks.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}