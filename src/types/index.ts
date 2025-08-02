export interface OnboardingQuestion {
  id: string
  question: string
  options: string[]
  order: number
}

export interface OnboardingAnswer {
  questionId: string
  answer: string
}

export interface Book {
  id: string
  title: string
  author: string
  isbn?: string
  amazonUrl: string
  imageUrl?: string
  description?: string
  genre?: string
}

export interface ReadingRecord {
  id: string
  content: string
  isPublic: boolean
  readAt: Date
  book: Book
}

export interface Recommendation {
  id: string
  title: string
  description: string
  articleUrl?: string
  isPublic: boolean
  book: Book
  user: {
    id: string
    name?: string
    image?: string
  }
}