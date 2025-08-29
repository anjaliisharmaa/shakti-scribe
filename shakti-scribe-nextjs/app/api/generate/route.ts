import { NextRequest, NextResponse } from 'next/server'
import { generateContent } from '@/lib/agents/contentGenerator'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, pillar, prompt } = body

    // Validate required fields
    if (!type || !pillar || !prompt) {
      return NextResponse.json(
        { error: 'Missing required fields: type, pillar, or prompt' },
        { status: 400 }
      )
    }

    // Validate content type
    const validTypes = ['video', 'text', 'poll']
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid content type. Must be video, text, or poll' },
        { status: 400 }
      )
    }

    // Validate pillar (agent)
    const validPillars = ['gynika', 'maaya', 'meher', 'nyaya', 'vaanya']
    if (!validPillars.includes(pillar)) {
      return NextResponse.json(
        { error: 'Invalid pillar. Must be one of the 5 Shakti AI agents' },
        { status: 400 }
      )
    }

    // Generate content using the appropriate agent
    const generatedContent = await generateContent({
      contentType: type,
      agent: pillar,
      prompt: prompt.trim()
    })

    return NextResponse.json({
      success: true,
      content: generatedContent,
      metadata: {
        contentType: type,
        agent: pillar,
        generatedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Content generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content. Please try again.' },
      { status: 500 }
    )
  }
}
