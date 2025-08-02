'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import BookCard from '@/components/recommendation/BookCard'
import { BookRecommendation } from '@/lib/recommendations'

interface RecommendationPageProps {
  params: { id: string }
}

export default function RecommendationPage({ params }: RecommendationPageProps) {
  const router = useRouter()
  const [recommendation, setRecommendation] = useState<BookRecommendation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch the recommendation from the API
    // For now, we'll use a mock recommendation and store it for alternatives
    const mockRecommendation: BookRecommendation = {
      id: 'business-1',
      title: '7つの習慣',
      author: 'スティーブン・R・コヴィー',
      amazonUrl: 'https://www.amazon.co.jp/dp/4906638015',
      description: '人生を変える永続的な幸福の原則',
      genre: 'ビジネス・自己啓発',
      reason: 'あなたの回答から、成長志向で時間を有効活用したい方にぴったりの一冊です。'
    }
    
    // Store current recommendation for alternatives page
    sessionStorage.setItem('currentRecommendation', JSON.stringify(mockRecommendation))
    sessionStorage.setItem('originalRecommendationId', mockRecommendation.id)
    
    setRecommendation(mockRecommendation)
    setLoading(false)
  }, [params.id])

  const handleStartReading = () => {
    router.push('/reading')
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">あなたにぴったりの本を探しています...</p>
        </div>
      </main>
    )
  }

  if (!recommendation) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">推薦が見つかりませんでした。</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            あなたにおすすめの一冊
          </h1>
          <p className="text-gray-600">
            質問への回答をもとに、最適な本をお選びしました
          </p>
          <div className="mt-4 h-6">
            {/* ページネーション表示エリアの高さを確保（代替書籍ページとの高さ統一） */}
          </div>
        </div>

        <BookCard book={recommendation} />

        <div className="flex justify-center mt-8">
          <button
            onClick={handleStartReading}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            読書記録を始める
          </button>
        </div>

        <div className="h-12 mt-6">
          {/* ページネーションドット表示エリアの高さを確保（代替書籍ページとの高さ統一） */}
        </div>
      </div>
    </main>
  )
}