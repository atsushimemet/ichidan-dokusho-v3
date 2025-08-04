import { OnboardingAnswer } from '@/types'

export interface BookRecommendation {
  id: string
  title: string
  author: string
  amazonUrl: string
  description: string
  genre: string
  reason: string
  // imageUrl: string // TODO: 将来的に実装予定
}

// Expanded recommendations database
const ALL_RECOMMENDATIONS: Record<string, BookRecommendation> = {
    'business_short': {
      id: 'business-1',
      title: '7つの習慣',
      author: 'スティーブン・R・コヴィー',
      amazonUrl: 'https://www.amazon.co.jp/dp/4906638015',
      description: '人生を変える永続的な幸福の原則',
      genre: 'ビジネス・自己啓発',
      reason: 'スキマ時間で読めて、人生とビジネスに直結する実践的な内容です。'
    },
    'business_long': {
      id: 'business-2',
      title: 'FACTFULNESS',
      author: 'ハンス・ロスリング',
      amazonUrl: 'https://www.amazon.co.jp/dp/4822262545',
      description: '10の思い込みを乗り越え、データを基に世界を正しく見る習慣',
      genre: 'ビジネス・自己啓発',
      reason: 'データに基づいた思考法を身につけ、ビジネスに活かせます。'
    },
    'novel_relax': {
      id: 'novel-1',
      title: 'コンビニ人間',
      author: '村田沙耶香',
      amazonUrl: 'https://www.amazon.co.jp/dp/4163905162',
      description: '芥川賞受賞作。現代社会の違和感を描いた話題作',
      genre: '小説・エッセイ',
      reason: '短時間で読めて、現代社会について考えさせられる作品です。'
    },
    'practical': {
      id: 'practical-1',
      title: '人を動かす',
      author: 'デール・カーネギー',
      amazonUrl: 'https://www.amazon.co.jp/dp/4422100513',
      description: '人間関係の古典的名著',
      genre: '実用書・ハウツー',
      reason: '実践的な人間関係のスキルが身につく永遠の名著です。'
    },
    'business_alt1': {
      id: 'business-3',
      title: '思考は現実化する',
      author: 'ナポレオン・ヒル',
      amazonUrl: 'https://www.amazon.co.jp/dp/4877710515',
      description: '成功哲学の原点となる不朽の名作',
      genre: 'ビジネス・自己啓発',
      reason: '目標設定と達成のための具体的な方法論が学べます。'
    },
    'business_alt2': {
      id: 'business-4',
      title: '金持ち父さん 貧乏父さん',
      author: 'ロバート・キヨサキ',
      amazonUrl: 'https://www.amazon.co.jp/dp/4480864245',
      description: 'お金と投資の本質を学ぶベストセラー',
      genre: 'ビジネス・自己啓発',
      reason: 'お金に対する考え方を根本から変える一冊です。'
    },
    'novel_alt1': {
      id: 'novel-2',
      title: '火花',
      author: '又吉直樹',
      amazonUrl: 'https://www.amazon.co.jp/dp/4167906112',
      description: '芥川賞受賞作。お笑い芸人の青春を描いた話題作',
      genre: '小説・エッセイ',
      reason: '現代の若者の心情を繊細に描いた感動的な作品です。'
    },
    'novel_alt2': {
      id: 'novel-3',
      title: '色彩を持たない多崎つくると、彼の巡礼の年',
      author: '村上春樹',
      amazonUrl: 'https://www.amazon.co.jp/dp/4163821406',
      description: '友情と喪失をテーマにした現代文学の傑作',
      genre: '小説・エッセイ',
      reason: '人間関係の複雑さと成長を描いた深い物語です。'
    },
    'practical_alt1': {
      id: 'practical-2',
      title: 'マンガでわかる！誰とでも15分以上 会話がとぎれない！話し方',
      author: '野口敏',
      amazonUrl: 'https://www.amazon.co.jp/dp/4799105566',
      description: 'コミュニケーション力を向上させる実践的ガイド',
      genre: '実用書・ハウツー',
      reason: '日常のコミュニケーションが劇的に改善します。'
    },
    'philosophy': {
      id: 'philosophy-1',
      title: '嫌われる勇気',
      author: '岸見一郎・古賀史健',
      amazonUrl: 'https://www.amazon.co.jp/dp/4478025819',
      description: 'アドラー心理学を分かりやすく解説したベストセラー',
      genre: '歴史・哲学',
      reason: '自分らしく生きるための心理学的アプローチが学べます。'
    }
  }

export function getBookRecommendation(answers: OnboardingAnswer[]): BookRecommendation {
  const timeAnswer = answers.find(a => a.questionId === '1')?.answer
  const genreAnswer = answers.find(a => a.questionId === '2')?.answer
  const purposeAnswer = answers.find(a => a.questionId === '3')?.answer

  // Recommendation logic
  if (genreAnswer?.includes('ビジネス')) {
    if (timeAnswer?.includes('5分') || timeAnswer?.includes('15')) {
      return ALL_RECOMMENDATIONS.business_short
    }
    return ALL_RECOMMENDATIONS.business_long
  }
  
  if (genreAnswer?.includes('小説')) {
    return ALL_RECOMMENDATIONS.novel_relax
  }
  
  if (genreAnswer?.includes('実用書')) {
    return ALL_RECOMMENDATIONS.practical
  }
  
  if (genreAnswer?.includes('歴史・哲学')) {
    return ALL_RECOMMENDATIONS.philosophy
  }

  // Default recommendation
  return ALL_RECOMMENDATIONS.business_short
}

export function getAllRecommendationsWithOriginal(currentBookId: string, answers: OnboardingAnswer[]): BookRecommendation[] {
  const genreAnswer = answers.find(a => a.questionId === '2')?.answer
  const recommendations: BookRecommendation[] = []

  // Get genre-specific recommendations including the original
  if (genreAnswer?.includes('ビジネス')) {
    recommendations.push(
      ALL_RECOMMENDATIONS.business_short, // 7つの習慣 (original)
      ALL_RECOMMENDATIONS.business_alt1,  // 思考は現実化する
      ALL_RECOMMENDATIONS.business_alt2   // 金持ち父さん 貧乏父さん
    )
  } else if (genreAnswer?.includes('小説')) {
    recommendations.push(
      ALL_RECOMMENDATIONS.novel_relax,    // コンビニ人間 (original)
      ALL_RECOMMENDATIONS.novel_alt1,     // 火花
      ALL_RECOMMENDATIONS.novel_alt2      // 色彩を持たない多崎つくると...
    )
  } else if (genreAnswer?.includes('実用書')) {
    recommendations.push(
      ALL_RECOMMENDATIONS.practical,      // 人を動かす (original)
      ALL_RECOMMENDATIONS.practical_alt1, // マンガでわかる！話し方
      ALL_RECOMMENDATIONS.business_short  // 7つの習慣
    )
  } else if (genreAnswer?.includes('歴史・哲学')) {
    recommendations.push(
      ALL_RECOMMENDATIONS.philosophy,     // 嫌われる勇気 (original)
      ALL_RECOMMENDATIONS.business_short, // 7つの習慣
      ALL_RECOMMENDATIONS.novel_relax     // コンビニ人間
    )
  } else {
    // Default recommendations
    recommendations.push(
      ALL_RECOMMENDATIONS.business_short, // 7つの習慣 (original)
      ALL_RECOMMENDATIONS.business_alt1,  // 思考は現実化する
      ALL_RECOMMENDATIONS.novel_relax     // コンビニ人間
    )
  }

  return recommendations.slice(0, 3)
}

export function getAlternativeRecommendations(currentBookId: string, answers: OnboardingAnswer[]): BookRecommendation[] {
  const allRecommendations = getAllRecommendationsWithOriginal(currentBookId, answers)
  // Filter out the current book and return alternatives only
  return allRecommendations.filter(book => book.id !== currentBookId)
}