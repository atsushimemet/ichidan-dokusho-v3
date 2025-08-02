import { OnboardingAnswer } from '@/types'

export interface BookRecommendation {
  id: string
  title: string
  author: string
  amazonUrl: string
  imageUrl: string
  description: string
  genre: string
  reason: string
}

export function getBookRecommendation(answers: OnboardingAnswer[]): BookRecommendation {
  const timeAnswer = answers.find(a => a.questionId === '1')?.answer
  const genreAnswer = answers.find(a => a.questionId === '2')?.answer
  const purposeAnswer = answers.find(a => a.questionId === '3')?.answer

  // Simple recommendation logic based on answers
  const recommendations: Record<string, BookRecommendation> = {
    'business_short': {
      id: 'business-1',
      title: '7つの習慣',
      author: 'スティーブン・R・コヴィー',
      amazonUrl: 'https://www.amazon.co.jp/dp/4906638015',
      imageUrl: 'https://m.media-amazon.com/images/I/51wsp-ZEPAL.jpg',
      description: '人生を変える永続的な幸福の原則',
      genre: 'ビジネス・自己啓発',
      reason: 'スキマ時間で読めて、人生とビジネスに直結する実践的な内容です。'
    },
    'business_long': {
      id: 'business-2',
      title: 'FACTFULNESS',
      author: 'ハンス・ロスリング',
      amazonUrl: 'https://www.amazon.co.jp/dp/4822262545',
      imageUrl: 'https://m.media-amazon.com/images/I/51XFU1M1VBL.jpg',
      description: '10の思い込みを乗り越え、データを基に世界を正しく見る習慣',
      genre: 'ビジネス・自己啓発',
      reason: 'データに基づいた思考法を身につけ、ビジネスに活かせます。'
    },
    'novel_relax': {
      id: 'novel-1',
      title: 'コンビニ人間',
      author: '村田沙耶香',
      amazonUrl: 'https://www.amazon.co.jp/dp/4163905162',
      imageUrl: 'https://m.media-amazon.com/images/I/51QNjYjgweL.jpg',
      description: '芥川賞受賞作。現代社会の違和感を描いた話題作',
      genre: '小説・エッセイ',
      reason: '短時間で読めて、現代社会について考えさせられる作品です。'
    },
    'practical': {
      id: 'practical-1',
      title: '人を動かす',
      author: 'デール・カーネギー',
      amazonUrl: 'https://www.amazon.co.jp/dp/4422100513',
      imageUrl: 'https://m.media-amazon.com/images/I/51E1gCZhKxL.jpg',
      description: '人間関係の古典的名著',
      genre: '実用書・ハウツー',
      reason: '実践的な人間関係のスキルが身につく永遠の名著です。'
    }
  }

  // Recommendation logic
  if (genreAnswer?.includes('ビジネス')) {
    if (timeAnswer?.includes('5分') || timeAnswer?.includes('15')) {
      return recommendations.business_short
    }
    return recommendations.business_long
  }
  
  if (genreAnswer?.includes('小説')) {
    return recommendations.novel_relax
  }
  
  if (genreAnswer?.includes('実用書')) {
    return recommendations.practical
  }

  // Default recommendation
  return recommendations.business_short
}