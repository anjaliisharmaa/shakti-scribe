import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, pillar, prompt } = body

    console.log('🚨 Next.js API called with:', { type, pillar, prompt })

    // Validate required fields
    if (!type || !pillar || !prompt) {
      return NextResponse.json(
        { error: 'Missing required fields: type, pillar, or prompt' },
        { status: 400 }
      )
    }

    // Try Python API first
    try {
      console.log('🐍 Calling Python API at http://localhost:8001/generate')
      
      const pythonResponse = await fetch('http://localhost:8001/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType: type === 'text' ? 'social_media_post' : type,
          agent: pillar,
          prompt: prompt.trim()
        })
      })

      console.log('📡 Python API response status:', pythonResponse.status)

      if (pythonResponse.ok) {
        const pythonResult = await pythonResponse.json()
        console.log('✅ Python API success:', pythonResult)
        
        // Transform Python response to match frontend expectations
        let transformedContent
        
        if (type === 'text') {
          transformedContent = {
            post: pythonResult.content,
            engagement: pythonResult.metadata?.callToAction || "What's your take on this?",
            hashtags: pythonResult.metadata?.hashtags || ['#TheShaktiTea', '#SpillTheShakti']
          }
        } else if (type === 'poll') {
          transformedContent = {
            question: pythonResult.title,
            options: [
              "Strongly agree",
              "Somewhat agree", 
              "Neutral",
              "Disagree"
            ],
            context: pythonResult.content,
            hashtags: pythonResult.metadata?.hashtags || ['#TheShaktiTea', '#SpillTheShakti']
          }
        } else if (type === 'video') {
          const lines = pythonResult.content.split('\n').filter((line: string) => line.trim())
          transformedContent = {
            visuals: lines.slice(0, Math.ceil(lines.length/2)),
            voiceover: lines.slice(Math.ceil(lines.length/2)),
            cta: pythonResult.metadata?.callToAction || "Share your thoughts!",
            hashtags: pythonResult.metadata?.hashtags || ['#TheShaktiTea', '#SpillTheShakti']
          }
        }
        
        console.log('🔄 Transformed content:', transformedContent)
        
        return NextResponse.json({
          success: true,
          content: transformedContent,
          metadata: {
            contentType: type,
            agent: pillar,
            generatedAt: new Date().toISOString(),
            method: 'Python Agents',
            originalTitle: pythonResult.title,
            generatedBy: pythonResult.metadata?.generatedBy
          }
        })
      } else {
        const errorText = await pythonResponse.text()
        console.error('❌ Python API error:', errorText)
        throw new Error(`Python API error: ${pythonResponse.status}`)
      }
      
    } catch (error) {
      console.error('❌ Python API failed, using fallback content:', error)
      
      // Fallback content matching frontend expectations
      let fallbackContent
      
      if (type === 'text') {
        fallbackContent = {
          post: `🚨 I'm ${pillar}, and I'd love to help with "${prompt}". 

The Python agents are currently unavailable, so this is a placeholder response. 

💔 This means you're seeing fallback content instead of my real insights and expertise.

🔧 Please try again later when the API is working! I have so much more to share with you.

✨ Your questions deserve real, thoughtful responses from our specialized agents!`,
          engagement: "Have you experienced this issue before? Let us know!",
          hashtags: ['#TheShaktiTea', '#APIError', '#TryAgain']
        }
      } else if (type === 'poll') {
        fallbackContent = {
          question: `What would you like ${pillar} to help you with regarding "${prompt}"?`,
          options: [
            "Detailed advice",
            "Quick tips", 
            "Personal experience",
            "Scientific facts"
          ],
          context: "The Python agents are currently unavailable. This is fallback content.",
          hashtags: ['#TheShaktiTea', '#APIError', '#PollFallback']
        }
      } else if (type === 'video') {
        fallbackContent = {
          visuals: [
            "Text overlay: API Currently Unavailable",
            "Close-up of concerned user", 
            "Text overlay: Try Again Later",
            "Logo: The Shakti Tea"
          ],
          voiceover: [
            "The Python agents are currently unavailable.",
            "This is fallback content for your request.",
            "Please try again when the API is working.",
            "We'll be back with real insights soon!"
          ],
          cta: "Try again later when our agents are available!",
          hashtags: ['#TheShaktiTea', '#APIError', '#VideoFallback']
        }
      }

      return NextResponse.json({
        success: true,
        content: fallbackContent,
        metadata: {
          contentType: type,
          agent: pillar,
          generatedAt: new Date().toISOString(),
          method: 'Fallback Content',
          error: String(error),
          fallback: true
        }
      })
    }

  } catch (error) {
    console.error('Content generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content. Please try again.' },
      { status: 500 }
    )
  }
}
