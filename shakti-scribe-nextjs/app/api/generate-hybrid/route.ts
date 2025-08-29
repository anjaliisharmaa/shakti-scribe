import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    message: 'Shakti Scribe Agent Router',
    availableAgents: ['gynika', 'maaya', 'meher', 'nyaya', 'vaanya'],
    methods: ['typescript', 'python'],
    endpoints: {
      generate: '/api/generate-hybrid',
      agents: '/api/agents-status',
      health: '/api/health'
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { agent, contentType, prompt, method = 'auto' } = body

    if (!agent || !contentType || !prompt) {
      return NextResponse.json(
        { error: 'Missing required fields: agent, contentType, prompt' },
        { status: 400 }
      )
    }

    // Auto-detect which system to use
    if (method === 'auto' || method === 'python') {
      try {
        // Try Python API first
        const pythonResponse = await fetch('http://localhost:8000/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ agent, contentType, prompt })
        })

        if (pythonResponse.ok) {
          const pythonResult = await pythonResponse.json()
          return NextResponse.json({
            ...pythonResult,
            generationMethod: 'Python CrewAI',
            fallback: false
          })
        } else {
          throw new Error(`Python API error: ${pythonResponse.status}`)
        }
      } catch (pythonError) {
        console.warn('Python API failed, trying TypeScript fallback:', pythonError)
        
        if (method === 'python') {
          return NextResponse.json(
            { error: 'Python agents not available', details: pythonError },
            { status: 503 }
          )
        }
      }
    }

    // Fallback to TypeScript agents
    try {
      const { generateContent } = await import('../../../lib/agents/contentGenerator')
      
      const result = await generateContent({ agent, contentType, prompt })
      
      return NextResponse.json({
        ...result,
        generationMethod: 'TypeScript (Fallback)',
        fallback: method === 'auto'
      })
      
    } catch (tsError) {
      return NextResponse.json(
        { error: 'All agent systems failed', pythonError: 'Failed', typescriptError: tsError },
        { status: 500 }
      )
    }

  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request', details: error },
      { status: 400 }
    )
  }
}
