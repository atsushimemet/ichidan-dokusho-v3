'use client'

import { useState } from 'react'

interface ReadingFormProps {
  onSubmit: (content: string, isPublic: boolean) => Promise<void>
  loading?: boolean
}

export default function ReadingForm({ onSubmit, loading = false }: ReadingFormProps) {
  const [content, setContent] = useState('')
  const [isPublic, setIsPublic] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    await onSubmit(content, isPublic)
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        今日読んだ一文を記録しましょう
      </h2>
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="印象に残った一文や感想を書いてください..."
        className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        rows={4}
        maxLength={280}
      />
      
      <div className="flex items-center justify-between mt-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm text-gray-600">
            他のユーザーにも公開する
          </span>
        </label>
        
        <div className="text-sm text-gray-500">
          {content.length}/280
        </div>
      </div>
      
      <button
        type="submit"
        disabled={!content.trim() || loading}
        className="w-full mt-4 bg-primary-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 hover:bg-primary-700 transition-colors"
      >
        {loading ? '記録中...' : '記録する'}
      </button>
    </form>
  )
}