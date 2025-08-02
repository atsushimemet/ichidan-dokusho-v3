import { NextRequest, NextResponse } from 'next/server'
import { getBookRecommendation } from '@/lib/recommendations'
import { OnboardingAnswer } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const { answers }: { answers: OnboardingAnswer[] } = await request.json()
    
    if (!answers || answers.length === 0) {
      return NextResponse.json(
        { error: 'No answers provided' },
        { status: 400 }
      )
    }

    const recommendation = getBookRecommendation(answers)
    
    // In a real app, you would save this to the database
    // For now, we'll just return the recommendation ID
    const recommendationId = `rec_${Date.now()}`

    return NextResponse.json({
      recommendationId,
      recommendation
    })
  } catch (error) {
    console.error('Error processing onboarding:', error)
    return NextResponse.json(
      { error: 'Failed to process onboarding' },
      { status: 500 }
    )
  }
}