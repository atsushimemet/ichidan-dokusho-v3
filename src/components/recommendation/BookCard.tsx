import { useRouter } from 'next/navigation'
import { BookRecommendation } from '@/lib/recommendations'

interface BookCardProps {
  book: BookRecommendation
  showAlternatives?: boolean
}

export default function BookCard({ book, showAlternatives = true }: BookCardProps) {
  const router = useRouter()

  const handleSeeAlternatives = () => {
    router.push(`/alternatives/${book.id}`)
  }
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto">
      <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-primary-500 font-semibold">
            {book.genre}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-2">
            {book.title}
          </h2>
          <p className="text-gray-600 mt-1">
            著者: {book.author}
          </p>
          <p className="text-gray-700 mt-4">
            {book.description}
          </p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              なぜこの本がおすすめなのか
            </h3>
            <p className="text-gray-700">
              {book.reason}
            </p>
          </div>
          <div className={`${showAlternatives ? 'flex space-x-4' : 'flex'} mt-6`}>
            <a
              href={book.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${showAlternatives ? 'flex-1' : 'w-full'} bg-primary-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors`}
            >
              いますぐ1行読む
            </a>
            {showAlternatives && (
              <button 
                onClick={handleSeeAlternatives}
                className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                他の本も見る
              </button>
            )}
          </div>
      </div>
    </div>
  )
}