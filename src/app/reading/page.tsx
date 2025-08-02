'use client'

import { useState, useEffect } from 'react'
import ReadingForm from '@/components/reading/ReadingForm'
import ReadingCalendar from '@/components/reading/ReadingCalendar'
import { ReadingRecord } from '@/types'

export default function ReadingPage() {
  const [records, setRecords] = useState<ReadingRecord[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Mock reading records for demonstration
    const mockRecords: ReadingRecord[] = [
      {
        id: '1',
        content: '「成功は習慣の積み重ねである」- この一文が心に響いた',
        isPublic: true,
        readAt: new Date(),
        book: {
          id: 'book-1',
          title: '7つの習慣',
          author: 'スティーブン・R・コヴィー',
          amazonUrl: 'https://amazon.co.jp',
          genre: 'ビジネス'
        }
      },
      {
        id: '2',
        content: '第二領域に時間を使うことの重要性を学んだ',
        isPublic: false,
        readAt: new Date(Date.now() - 86400000), // Yesterday
        book: {
          id: 'book-1',
          title: '7つの習慣',
          author: 'スティーブン・R・コヴィー',
          amazonUrl: 'https://amazon.co.jp',
          genre: 'ビジネス'
        }
      }
    ]
    setRecords(mockRecords)
  }, [])

  const handleSubmitRecord = async (content: string, isPublic: boolean) => {
    setLoading(true)
    
    try {
      // In a real app, this would be an API call
      const newRecord: ReadingRecord = {
        id: Date.now().toString(),
        content,
        isPublic,
        readAt: new Date(),
        book: {
          id: 'book-1',
          title: '7つの習慣',
          author: 'スティーブン・R・コヴィー',
          amazonUrl: 'https://amazon.co.jp',
          genre: 'ビジネス'
        }
      }
      
      setRecords(prev => [newRecord, ...prev])
    } catch (error) {
      console.error('Failed to save reading record:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            読書記録
          </h1>
          <p className="text-gray-600">
            今日読んだ一文を記録して、読書習慣を身につけましょう
          </p>
        </div>

        <ReadingForm onSubmit={handleSubmitRecord} loading={loading} />
        
        <ReadingCalendar records={records} />

        {records.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              最近の記録
            </h2>
            <div className="space-y-4">
              {records.slice(0, 5).map(record => (
                <div key={record.id} className="border-l-4 border-primary-500 pl-4">
                  <p className="text-gray-700">{record.content}</p>
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                    <span>{record.book.title}</span>
                    <span>{new Date(record.readAt).toLocaleDateString('ja-JP')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}